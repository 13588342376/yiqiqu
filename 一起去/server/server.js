// 后端入口：HTTP 服务 + REST API + 托管静态文件（零外部依赖）。
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const db = require("./db");
const seed = require("./seed");

const PORT = Number(process.env.PORT) || 3000;
const WEB_DIR = path.join(__dirname, "..", "web");
const ADMIN_DIR = path.join(__dirname, "..", "admin");
const UPLOAD_DIR = path.join(__dirname, "uploads");
const UPLOAD_CATEGORIES = ["covers", "team-icons", "avatars", "banners", "icons", "backgrounds"];

function sendJSON(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error("请求体不是合法 JSON"));
      }
    });
    req.on("error", reject);
  });
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const map = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx > -1) map[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return map;
}

function currentUser(req) {
  const cookies = parseCookies(req);
  return db.getUserBySession(db.conn, cookies.session);
}

function requireUser(req, res) {
  const user = currentUser(req);
  if (!user) {
    sendJSON(res, 401, { error: "请先登录" });
    return null;
  }
  return user;
}

function setSessionCookie(res, token, maxAge) {
  const cookie = "session=" + token + "; Path=/; HttpOnly; SameSite=Lax; Max-Age=" + (maxAge || 60 * 60 * 24 * 30);
  res.setHeader("Set-Cookie", cookie);
}

function mime(filePath) {
  const map = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };
  return map[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function serveStatic(req, res, pathname) {
  if (pathname === "/admin") {
    res.writeHead(301, { Location: "/admin/" });
    res.end();
    return;
  }
  let base;
  let rel;
  if (pathname.startsWith("/uploads/")) {
    base = UPLOAD_DIR;
    rel = pathname.replace(/^\/uploads\//, "");
  } else if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    base = ADMIN_DIR;
    rel = pathname.replace(/^\/admin\/?/, "");
  } else {
    base = WEB_DIR;
    rel = pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
  }

  let filePath = path.resolve(base, rel || "index.html");
  if (!filePath.startsWith(path.resolve(base))) {
    return sendText(res, 403, "Forbidden");
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) return sendText(res, 404, "Not Found");
    res.writeHead(200, { "Content-Type": mime(filePath) });
    res.end(data);
  });
}

async function handleApi(req, res, pathname, method, search) {
  const parts = pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  const resource = parts[0];
  const id = parts[1] ? decodeURIComponent(parts[1]) : null;

  if (resource === "auth") {
    if (parts[1] === "register" && method === "POST") {
      const body = await readBody(req);
      if (!body.username || !body.password) return sendJSON(res, 400, { error: "用户名和密码不能为空" });
      if (db.getUserByUsername(db.conn, body.username)) return sendJSON(res, 409, { error: "用户名已存在" });
      const user = db.createUser(db.conn, body);
      const token = db.createSession(db.conn, user.id);
      setSessionCookie(res, token);
      return sendJSON(res, 201, { user });
    }
    if (parts[1] === "login" && method === "POST") {
      const body = await readBody(req);
      const row = db.getUserByUsername(db.conn, body.username);
      if (!row || !db.verifyPassword(body.password, row.password_hash)) {
        return sendJSON(res, 401, { error: "用户名或密码错误" });
      }
      const token = db.createSession(db.conn, row.id);
      setSessionCookie(res, token);
      return sendJSON(res, 200, { user: db.getUserById(db.conn, row.id) });
    }
    if (parts[1] === "logout" && method === "POST") {
      const cookies = parseCookies(req);
      db.deleteSession(db.conn, cookies.session);
      setSessionCookie(res, "", 0);
      return sendJSON(res, 200, { ok: true });
    }
    if (parts[1] === "me" && method === "GET") {
      const user = currentUser(req);
      return sendJSON(res, 200, { user });
    }
    if (parts[1] === "me" && method === "PUT") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readBody(req);
      return sendJSON(res, 200, { user: db.updateUser(db.conn, user.id, body) });
    }
  }

  if (resource === "todos") {
    const user = requireUser(req, res);
    if (!user) return;
    if (method === "GET") return sendJSON(res, 200, db.listTodos(db.conn, user.id));
    if (method === "POST") {
      const body = await readBody(req);
      if (!body.text) return sendJSON(res, 400, { error: "待办内容不能为空" });
      return sendJSON(res, 201, db.createTodo(db.conn, user.id, body.text));
    }
    if (method === "PATCH" && id) return sendJSON(res, 200, db.toggleTodo(db.conn, user.id, id));
    if (method === "DELETE" && id) return sendJSON(res, 200, db.deleteTodo(db.conn, user.id, id));
  }

  if (resource === "upload" && method === "POST") {
    const body = await readBody(req);
    const dataUrl = body.dataUrl;
    if (!dataUrl) return sendJSON(res, 400, { error: "缺少图片数据" });
    const m = /^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
    if (!m) return sendJSON(res, 400, { error: "图片格式不正确" });
    let ext = m[1].toLowerCase();
    if (ext === "jpeg") ext = "jpg";
    if (ext === "svg+xml") ext = "svg";
    const category = UPLOAD_CATEGORIES.includes(body.category) ? body.category : "covers";
    const name = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
    const buf = Buffer.from(m[2], "base64");
    const dir = path.join(UPLOAD_DIR, category);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name), buf);
    return sendJSON(res, 200, { url: "/uploads/" + category + "/" + name });
  }

  if (resource === "expos") {
    if (method === "GET" && !id) {
      const counts = db.teamCountByExpo(db.conn);
      return sendJSON(res, 200, db.listExpos(db.conn).map((e) => ({ ...e, teamCount: counts[e.id] || 0 })));
    }
    if (method === "GET" && id) {
      const expo = db.getExpo(db.conn, id);
      if (!expo) return sendJSON(res, 404, { error: "未找到该漫展" });
      return sendJSON(res, 200, { ...expo, teams: db.listTeams(db.conn, id).filter((t) => t.status === "approved") });
    }
    if (method === "POST") {
      const body = await readBody(req);
      return sendJSON(res, 201, db.createExpo(db.conn, body));
    }
    if (method === "PUT" && id) {
      const body = await readBody(req);
      return sendJSON(res, 200, db.updateExpo(db.conn, id, body));
    }
    if (method === "DELETE" && id) {
      db.deleteExpo(db.conn, id);
      return sendJSON(res, 200, { ok: true });
    }
  }

  if (resource === "teams") {
    if (method === "GET" && !id) {
      const expoId = search.get("expoId");
      let teams = db.listTeams(db.conn, expoId || undefined);
      if (search.get("mine") === "1") {
        const user = requireUser(req, res);
        if (!user) return;
        const userState = db.getState(db.conn, user.id);
        const mine = new Set([...(userState.joined || []), ...(userState.applied || [])]);
        teams = teams.filter((t) => t.leaderUserId === user.id || mine.has(t.id));
      } else if (search.get("all") !== "1") {
        teams = teams.filter((t) => t.status === "approved");
      }
      return sendJSON(res, 200, teams);
    }
    if (method === "GET" && id && !parts[2]) {
      const team = db.getTeam(db.conn, id);
      if (!team) return sendJSON(res, 404, { error: "未找到该队伍" });
      return sendJSON(res, 200, team);
    }
    if (method === "POST" && !id) {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readBody(req);
      body.leader = user.nickname;
      body.leaderUserId = user.id;
      if (body.iconKind === "image" && (user.level || 1) < 3) {
        return sendJSON(res, 403, { error: "达到 Lv.3 后才能上传自定义队伍图标" });
      }
      const team = db.createTeam(db.conn, body);
      db.addExp(db.conn, user.id, 30);
      return sendJSON(res, 201, team);
    }
    if (method === "GET" && id && parts[2] === "requests") {
      const user = requireUser(req, res);
      if (!user) return;
      const team = db.getTeam(db.conn, id);
      if (!team) return sendJSON(res, 404, { error: "未找到该队伍" });
      if (team.leaderUserId !== user.id) return sendJSON(res, 403, { error: "只有领队可以查看申请列表" });
      return sendJSON(res, 200, db.listTeamRequests(db.conn, id));
    }
    if (method === "POST" && id && parts[2] === "requests") {
      const user = requireUser(req, res);
      if (!user) return;
      const team = db.getTeam(db.conn, id);
      if (!team) return sendJSON(res, 404, { error: "未找到该队伍" });
      const stateData = db.getState(db.conn, user.id);
      const applied = stateData.applied || [];
      if (applied.includes(id)) return sendJSON(res, 409, { error: "你已经申请过该队伍" });
      db.createTeamRequest(db.conn, id, user.id);
      stateData.applied = [...applied, id];
      db.setState(db.conn, user.id, stateData);
      return sendJSON(res, 201, { ok: true });
    }
    if (method === "PATCH" && id && parts[2] === "requests" && parts[3]) {
      const user = requireUser(req, res);
      if (!user) return;
      const team = db.getTeam(db.conn, id);
      if (!team) return sendJSON(res, 404, { error: "未找到该队伍" });
      if (team.leaderUserId !== user.id) return sendJSON(res, 403, { error: "只有领队可以处理申请" });
      const body = await readBody(req);
      const status = body.status === "approved" ? "approved" : "rejected";
      const request = db.getTeamRequestRow(db.conn, parts[3]);
      if (!request || request.team_id !== id) return sendJSON(res, 404, { error: "申请不存在" });
      db.setTeamRequestStatus(db.conn, id, parts[3], status);
      const memberState = db.getState(db.conn, request.user_id);
      memberState.applied = (memberState.applied || []).filter((x) => x !== id);
      if (status === "approved") {
        if (!memberState.joined) memberState.joined = [];
        if (!memberState.joined.includes(id)) {
          memberState.joined.push(id);
          db.conn.prepare("UPDATE teams SET size = size + 1 WHERE id = ? AND size < cap").run(id);
          db.addExp(db.conn, request.user_id, 10);
        }
      }
      db.setState(db.conn, request.user_id, memberState);
      return sendJSON(res, 200, db.listTeamRequests(db.conn, id));
    }
    if (method === "PUT" && id && parts[2] === "status") {
      const body = await readBody(req);
      const status = ["approved", "rejected", "pending"].includes(body.status) ? body.status : "pending";
      return sendJSON(res, 200, db.setTeamStatus(db.conn, id, status));
    }
    if (method === "PUT" && id && !parts[2]) {
      const body = await readBody(req);
      return sendJSON(res, 200, db.updateTeam(db.conn, id, body));
    }
    if (method === "DELETE" && id) {
      db.deleteTeam(db.conn, id);
      return sendJSON(res, 200, { ok: true });
    }
  }

  if (resource === "reports") {
    if (method === "GET") {
      return sendJSON(res, 200, db.listReports(db.conn));
    }
    if (method === "POST") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readBody(req);
      if (!body.teamId) return sendJSON(res, 400, { error: "缺少队伍信息" });
      db.createReport(db.conn, {
        teamId: body.teamId,
        reporterUserId: user.id,
        reason: body.reason,
        detail: body.detail,
      });
      return sendJSON(res, 201, { ok: true });
    }
    if (method === "PATCH" && id) {
      const body = await readBody(req);
      const status = ["pending", "handled", "dismissed"].includes(body.status)
        ? body.status
        : "handled";
      return sendJSON(res, 200, db.setReportStatus(db.conn, id, status));
    }
  }

  if (resource === "avatar-requests") {
    if (method === "GET") {
      return sendJSON(res, 200, db.listAvatarRequests(db.conn));
    }
    if (method === "POST") {
      const user = requireUser(req, res);
      if (!user) return;
      const body = await readBody(req);
      if (!body.avatarUrl) return sendJSON(res, 400, { error: "缺少头像图片" });
      db.createAvatarRequest(db.conn, user.id, body.avatarUrl);
      return sendJSON(res, 201, { ok: true });
    }
    if (method === "PATCH" && id) {
      const body = await readBody(req);
      const status = ["pending", "approved", "rejected"].includes(body.status)
        ? body.status
        : "pending";
      const updated = db.setAvatarRequestStatus(db.conn, id, status);
      if (!updated) return sendJSON(res, 404, { error: "审核记录不存在" });
      return sendJSON(res, 200, updated);
    }
  }

  if (resource === "state") {
    const user = requireUser(req, res);
    if (!user) return;
    if (method === "GET") return sendJSON(res, 200, db.getState(db.conn, user.id));
    if (method === "POST") {
      const body = await readBody(req);
      return sendJSON(res, 200, db.setState(db.conn, user.id, body));
    }
  }

  return sendJSON(res, 404, { error: "接口不存在" });
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  const pathname = decodeURIComponent(u.pathname);

  if (pathname.startsWith("/api/")) {
    try {
      await handleApi(req, res, pathname, req.method, u.searchParams);
    } catch (e) {
      sendJSON(res, 500, { error: e.message || "服务器内部错误" });
    }
    return;
  }

  serveStatic(req, res, pathname);
});

// 启动时连接并初始化数据库，把连接挂在 db.conn 上供处理器复用
db.conn = db.connect();
db.init(db.conn);
seed.seedIfEmpty(db.conn);

server.listen(PORT, () => {
  console.log("「一起去」后端已启动：");
  console.log("  用户端  http://localhost:" + PORT + "/");
  console.log("  管理后台 http://localhost:" + PORT + "/admin");
});
