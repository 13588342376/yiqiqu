// 后端入口：HTTP 服务 + REST API + 托管静态文件（零外部依赖）。
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const db = require("./db");

const PORT = Number(process.env.PORT) || 3000;
const WEB_DIR = path.join(__dirname, "..", "web");
const ADMIN_DIR = path.join(__dirname, "..", "admin");
const UPLOAD_DIR = path.join(__dirname, "uploads");

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

  if (resource === "upload" && method === "POST") {
    const body = await readBody(req);
    const dataUrl = body.dataUrl;
    if (!dataUrl) return sendJSON(res, 400, { error: "缺少图片数据" });
    const m = /^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
    if (!m) return sendJSON(res, 400, { error: "图片格式不正确" });
    let ext = m[1].toLowerCase();
    if (ext === "jpeg") ext = "jpg";
    if (ext === "svg+xml") ext = "svg";
    const name = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
    const buf = Buffer.from(m[2], "base64");
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return sendJSON(res, 200, { url: "/uploads/" + name });
  }

  if (resource === "expos") {
    if (method === "GET" && !id) {
      const counts = db.teamCountByExpo(db.conn);
      return sendJSON(res, 200, db.listExpos(db.conn).map((e) => ({ ...e, teamCount: counts[e.id] || 0 })));
    }
    if (method === "GET" && id) {
      const expo = db.getExpo(db.conn, id);
      if (!expo) return sendJSON(res, 404, { error: "未找到该漫展" });
      return sendJSON(res, 200, { ...expo, teams: db.listTeams(db.conn, id) });
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
      return sendJSON(res, 200, db.listTeams(db.conn, expoId || undefined));
    }
    if (method === "GET" && id) {
      const team = db.getTeam(db.conn, id);
      if (!team) return sendJSON(res, 404, { error: "未找到该队伍" });
      return sendJSON(res, 200, team);
    }
    if (method === "POST") {
      const body = await readBody(req);
      return sendJSON(res, 201, db.createTeam(db.conn, body));
    }
    if (method === "PUT" && id) {
      const body = await readBody(req);
      return sendJSON(res, 200, db.updateTeam(db.conn, id, body));
    }
    if (method === "DELETE" && id) {
      db.deleteTeam(db.conn, id);
      return sendJSON(res, 200, { ok: true });
    }
  }

  if (resource === "state") {
    if (method === "GET") return sendJSON(res, 200, db.getState(db.conn));
    if (method === "POST") {
      const body = await readBody(req);
      return sendJSON(res, 200, db.setState(db.conn, body));
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

server.listen(PORT, () => {
  console.log("「一起去」后端已启动：");
  console.log("  用户端  http://localhost:" + PORT + "/");
  console.log("  管理后台 http://localhost:" + PORT + "/admin");
});
