// 数据库层：使用 Node 内置的 node:sqlite，无需任何外部依赖。
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");
const crypto = require("node:crypto");

const DB_PATH = path.join(__dirname, "data.db");

function connect() {
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  return db;
}

function init(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS expos (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      glyph      TEXT,
      city       TEXT,
      venue      TEXT,
      start_date TEXT,
      end_date   TEXT,
      scale      TEXT,
      desc       TEXT,
      cover      TEXT,
      cover_image TEXT,
      tags       TEXT,
      ticket_url TEXT
    );

    CREATE TABLE IF NOT EXISTS teams (
      id         TEXT PRIMARY KEY,
      expo_id    TEXT NOT NULL REFERENCES expos(id),
      name       TEXT NOT NULL,
      leader     TEXT,
      leader_user_id TEXT,
      from_city  TEXT,
      mode       TEXT,
      size       INTEGER DEFAULT 1,
      cap        INTEGER DEFAULT 5,
      color      TEXT,
      tags       TEXT,
      icon       TEXT,
      icon_kind  TEXT,
      status     TEXT DEFAULT 'approved',
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS user_state (
      user_id TEXT PRIMARY KEY,
      data    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      nickname      TEXT,
      avatar_url    TEXT,
      level         INTEGER DEFAULT 1,
      exp           INTEGER DEFAULT 0,
      bio           TEXT,
      city          TEXT,
      created_at    TEXT
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token      TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id),
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS todos (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id),
      text       TEXT NOT NULL,
      done       INTEGER DEFAULT 0,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS team_requests (
      id         TEXT PRIMARY KEY,
      team_id    TEXT NOT NULL REFERENCES teams(id),
      user_id    TEXT NOT NULL REFERENCES users(id),
      status     TEXT DEFAULT 'pending',
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS reports (
      id                TEXT PRIMARY KEY,
      team_id           TEXT NOT NULL REFERENCES teams(id),
      reporter_user_id  TEXT NOT NULL REFERENCES users(id),
      reason            TEXT,
      detail            TEXT,
      status            TEXT DEFAULT 'pending',
      created_at        TEXT
    );

    CREATE TABLE IF NOT EXISTS avatar_requests (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id),
      avatar_url TEXT NOT NULL,
      status     TEXT DEFAULT 'pending',
      created_at TEXT
    );
  `);

  const expoCols = db.prepare("PRAGMA table_info(expos)").all().map((c) => c.name);
  if (!expoCols.includes("cover_image")) {
    db.exec("ALTER TABLE expos ADD COLUMN cover_image TEXT");
  }

  // 迁移旧版单用户 user_state（id 整型）为按用户存的结构
  const stateCols = db.prepare("PRAGMA table_info(user_state)").all().map((c) => c.name);
  if (stateCols.includes("id") && !stateCols.includes("user_id")) {
    db.exec("DROP TABLE user_state");
    db.exec("CREATE TABLE user_state (user_id TEXT PRIMARY KEY, data TEXT NOT NULL)");
  }

  const teamCols = db.prepare("PRAGMA table_info(teams)").all().map((c) => c.name);
  if (!teamCols.includes("leader_user_id")) {
    db.exec("ALTER TABLE teams ADD COLUMN leader_user_id TEXT");
  }
  if (!teamCols.includes("icon")) {
    db.exec("ALTER TABLE teams ADD COLUMN icon TEXT");
  }
  if (!teamCols.includes("icon_kind")) {
    db.exec("ALTER TABLE teams ADD COLUMN icon_kind TEXT");
  }
  if (!teamCols.includes("status")) {
    db.exec("ALTER TABLE teams ADD COLUMN status TEXT DEFAULT 'approved'");
  }

  return db;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return salt + ":" + hash;
}

function verifyPassword(password, stored) {
  const parts = String(stored || "").split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const test = crypto.scryptSync(String(password), salt, 64).toString("hex");
  const a = Buffer.from(hash, "hex");
  const b = Buffer.from(test, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    nickname: row.nickname || row.username,
    avatarUrl: row.avatar_url || "",
    level: row.level || 1,
    exp: row.exp || 0,
    bio: row.bio || "",
    city: row.city || "",
    createdAt: row.created_at,
  };
}

function parseTags(raw) {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function daysLabel(start, end) {
  if (!start || !end) return "";
  const a = new Date(start);
  const b = new Date(end);
  const diff = Math.round((b - a) / 86400000) + 1;
  return diff > 1 ? diff + "天" : "1天";
}

function rowToExpo(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    glyph: row.glyph,
    city: row.city,
    venue: row.venue,
    start: row.start_date,
    end: row.end_date,
    scale: row.scale,
    desc: row.desc,
    cover: row.cover,
    coverImage: row.cover_image || "",
    tags: parseTags(row.tags),
    ticketUrl: row.ticket_url || "",
    days: daysLabel(row.start_date, row.end_date),
  };
}

function rowToTeam(row) {
  if (!row) return null;
  return {
    id: row.id,
    expoId: row.expo_id,
    name: row.name,
    leader: row.leader,
    leaderUserId: row.leader_user_id || "",
    from: row.from_city,
    mode: row.mode,
    size: row.size,
    cap: row.cap,
    color: row.color,
    tags: parseTags(row.tags),
    icon: row.icon || "",
    iconKind: row.icon_kind || (row.icon ? "emoji" : ""),
    status: row.status || "approved",
    createdAt: row.created_at,
  };
}

function listExpos(db) {
  return db.prepare("SELECT * FROM expos ORDER BY start_date").all().map(rowToExpo);
}

function getExpo(db, id) {
  return rowToExpo(db.prepare("SELECT * FROM expos WHERE id = ?").get(id));
}

function teamCountByExpo(db) {
  const rows = db.prepare("SELECT expo_id AS expoId, COUNT(*) AS n FROM teams GROUP BY expo_id").all();
  const map = {};
  for (const r of rows) map[r.expoId] = r.n;
  return map;
}

function listTeams(db, expoId) {
  const sql = expoId
    ? "SELECT * FROM teams WHERE expo_id = ? ORDER BY created_at"
    : "SELECT * FROM teams ORDER BY created_at";
  const rows = expoId ? db.prepare(sql).all(expoId) : db.prepare(sql).all();
  return rows.map(rowToTeam);
}

function getTeam(db, id) {
  return rowToTeam(db.prepare("SELECT * FROM teams WHERE id = ?").get(id));
}

function createTeam(db, team) {
  const id = "t-" + require("node:crypto").randomUUID().slice(0, 8);
  db.prepare(
    `INSERT INTO teams (id, expo_id, name, leader, leader_user_id, from_city, mode, size, cap, color, tags, icon, icon_kind, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    team.expoId,
    team.name,
    team.leader || "汐",
    team.leaderUserId || "",
    team.from || "",
    team.mode || "地铁",
    1,
    Number(team.cap) || 5,
    team.color || "",
    JSON.stringify(team.tags || []),
    team.icon || "",
    team.iconKind || "emoji",
    team.status || "pending",
    new Date().toISOString()
  );
  return getTeam(db, id);
}

function createExpo(db, expo) {
  const id = "e-" + require("node:crypto").randomUUID().slice(0, 8);
  db.prepare(
    `INSERT INTO expos (id, name, glyph, city, venue, start_date, end_date, scale, desc, cover, cover_image, tags, ticket_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    expo.name,
    expo.glyph || "",
    expo.city || "",
    expo.venue || "",
    expo.start || "",
    expo.end || "",
    expo.scale || "",
    expo.desc || "",
    expo.cover || "",
    expo.coverImage || "",
    JSON.stringify(expo.tags || []),
    expo.ticketUrl || ""
  );
  return getExpo(db, id);
}

function updateExpo(db, id, expo) {
  db.prepare(
    `UPDATE expos SET name=?, glyph=?, city=?, venue=?, start_date=?, end_date=?, scale=?, desc=?, cover=?, cover_image=?, tags=?, ticket_url=? WHERE id=?`
  ).run(
    expo.name,
    expo.glyph || "",
    expo.city || "",
    expo.venue || "",
    expo.start || "",
    expo.end || "",
    expo.scale || "",
    expo.desc || "",
    expo.cover || "",
    expo.coverImage || "",
    JSON.stringify(expo.tags || []),
    expo.ticketUrl || "",
    id
  );
  return getExpo(db, id);
}

function deleteExpo(db, id) {
  db.prepare("DELETE FROM team_requests WHERE team_id IN (SELECT id FROM teams WHERE expo_id = ?)").run(id);
  db.prepare("DELETE FROM reports WHERE team_id IN (SELECT id FROM teams WHERE expo_id = ?)").run(id);
  db.prepare("DELETE FROM teams WHERE expo_id = ?").run(id);
  db.prepare("DELETE FROM expos WHERE id = ?").run(id);
}

function updateTeam(db, id, team) {
  db.prepare(
    `UPDATE teams SET expo_id=?, name=?, leader=?, from_city=?, mode=?, size=?, cap=?, color=?, tags=? WHERE id=?`
  ).run(
    team.expoId,
    team.name,
    team.leader || "",
    team.from || "",
    team.mode || "",
    Number(team.size) || 1,
    Number(team.cap) || 5,
    team.color || "",
    JSON.stringify(team.tags || []),
    id
  );
  return getTeam(db, id);
}

function deleteTeam(db, id) {
  db.prepare("DELETE FROM team_requests WHERE team_id = ?").run(id);
  db.prepare("DELETE FROM reports WHERE team_id = ?").run(id);
  db.prepare("DELETE FROM teams WHERE id = ?").run(id);
}

function getState(db, userId) {
  if (!userId) return { favorites: [], joined: [], applied: [] };
  const row = db.prepare("SELECT data FROM user_state WHERE user_id = ?").get(userId);
  if (!row) return { favorites: [], joined: [], applied: [] };
  try {
    return JSON.parse(row.data);
  } catch {
    return { favorites: [], joined: [], applied: [] };
  }
}

function setState(db, userId, data) {
  db.prepare(
    "INSERT INTO user_state (user_id, data) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data"
  ).run(userId, JSON.stringify(data));
  return getState(db, userId);
}

/* ---------- 用户与认证 ---------- */

function createUser(db, { username, password, nickname }) {
  const id = "u-" + crypto.randomUUID().slice(0, 8);
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO users (id, username, password_hash, nickname, avatar_url, level, exp, bio, city, created_at)
     VALUES (?, ?, ?, ?, '', 1, 0, '', '', ?)`
  ).run(id, username, hashPassword(password), nickname || username, now);
  return getUserById(db, id);
}

function getUserByUsername(db, username) {
  return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
}

function getUserById(db, id) {
  return publicUser(db.prepare("SELECT * FROM users WHERE id = ?").get(id));
}

function updateUser(db, id, fields) {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  if (!user) return null;
  db.prepare(
    `UPDATE users SET nickname=?, avatar_url=?, bio=?, city=? WHERE id=?`
  ).run(
    fields.nickname ?? user.nickname,
    fields.avatarUrl ?? user.avatar_url,
    fields.bio ?? user.bio,
    fields.city ?? user.city,
    id
  );
  return getUserById(db, id);
}

function addExp(db, id, amount) {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  if (!user) return null;
  const exp = (user.exp || 0) + Number(amount || 0);
  const level = Math.floor(exp / 100) + 1;
  db.prepare("UPDATE users SET exp=?, level=? WHERE id=?").run(exp, level, id);
  return getUserById(db, id);
}

function createSession(db, userId) {
  const token = crypto.randomBytes(32).toString("hex");
  db.prepare("INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)").run(
    token,
    userId,
    new Date().toISOString()
  );
  return token;
}

function getUserBySession(db, token) {
  if (!token) return null;
  const row = db.prepare("SELECT * FROM sessions WHERE token = ?").get(token);
  if (!row) return null;
  return getUserById(db, row.user_id);
}

function deleteSession(db, token) {
  if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

/* ---------- 待办 ---------- */

function listTodos(db, userId) {
  return db
    .prepare("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at")
    .all(userId)
    .map((t) => ({ id: t.id, text: t.text, done: !!t.done, createdAt: t.created_at }));
}

function createTodo(db, userId, text) {
  const id = "todo-" + crypto.randomUUID().slice(0, 8);
  db.prepare("INSERT INTO todos (id, user_id, text, done, created_at) VALUES (?, ?, ?, 0, ?)").run(
    id,
    userId,
    text,
    new Date().toISOString()
  );
  return listTodos(db, userId);
}

function toggleTodo(db, userId, todoId) {
  db.prepare("UPDATE todos SET done = CASE done WHEN 0 THEN 1 ELSE 0 END WHERE id = ? AND user_id = ?").run(
    todoId,
    userId
  );
  return listTodos(db, userId);
}

function deleteTodo(db, userId, todoId) {
  db.prepare("DELETE FROM todos WHERE id = ? AND user_id = ?").run(todoId, userId);
  return listTodos(db, userId);
}

/* ---------- 队伍审核 / 申请 / 举报 ---------- */

function setTeamStatus(db, id, status) {
  db.prepare("UPDATE teams SET status = ? WHERE id = ?").run(status, id);
  return getTeam(db, id);
}

function createTeamRequest(db, teamId, userId) {
  const id = "req-" + crypto.randomUUID().slice(0, 8);
  db.prepare(
    "INSERT INTO team_requests (id, team_id, user_id, status, created_at) VALUES (?, ?, ?, 'pending', ?)"
  ).run(id, teamId, userId, new Date().toISOString());
  return getTeamRequest(db, teamId, id);
}

function getTeamRequest(db, teamId, id) {
  return db
    .prepare(
      `SELECT r.id, r.team_id AS teamId, r.user_id AS userId, r.status, r.created_at AS createdAt,
              u.username, u.nickname, u.level, u.avatar_url AS avatarUrl
       FROM team_requests r JOIN users u ON u.id = r.user_id
       WHERE r.id = ? AND r.team_id = ?`
    )
    .get(id, teamId);
}

function listTeamRequests(db, teamId) {
  return db
    .prepare(
      `SELECT r.id, r.team_id AS teamId, r.user_id AS userId, r.status, r.created_at AS createdAt,
              u.username, u.nickname, u.level, u.avatar_url AS avatarUrl
       FROM team_requests r JOIN users u ON u.id = r.user_id
       WHERE r.team_id = ? ORDER BY r.created_at`
    )
    .all(teamId)
    .map((r) => ({
      id: r.id,
      teamId: r.teamId,
      userId: r.userId,
      status: r.status,
      createdAt: r.createdAt,
      user: {
        id: r.userId,
        username: r.username,
        nickname: r.nickname || r.username,
        level: r.level || 1,
        avatarUrl: r.avatarUrl || "",
      },
    }));
}

function getPendingRequestCount(db, teamId) {
  const row = db
    .prepare("SELECT COUNT(*) AS n FROM team_requests WHERE team_id = ? AND status = 'pending'")
    .get(teamId);
  return row ? row.n : 0;
}

function setTeamRequestStatus(db, teamId, id, status) {
  db.prepare("UPDATE team_requests SET status = ? WHERE id = ? AND team_id = ?").run(
    status,
    id,
    teamId
  );
  return getTeamRequest(db, teamId, id);
}

function getTeamRequestRow(db, id) {
  return db.prepare("SELECT * FROM team_requests WHERE id = ?").get(id);
}

function createReport(db, { teamId, reporterUserId, reason, detail }) {
  const id = "rep-" + crypto.randomUUID().slice(0, 8);
  db.prepare(
    "INSERT INTO reports (id, team_id, reporter_user_id, reason, detail, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?)"
  ).run(id, teamId, reporterUserId, reason || "", detail || "", new Date().toISOString());
  return id;
}

function listReports(db) {
  return db
    .prepare(
      `SELECT r.id, r.team_id AS teamId, r.reason, r.detail, r.status, r.created_at AS createdAt,
              t.name AS teamName, t.icon, t.icon_kind AS iconKind,
              u.username AS reporterUsername, u.nickname AS reporterNickname
       FROM reports r
       JOIN teams t ON t.id = r.team_id
       JOIN users u ON u.id = r.reporter_user_id
       ORDER BY r.created_at DESC`
    )
    .all()
    .map((r) => ({
      id: r.id,
      teamId: r.teamId,
      teamName: r.teamName,
      icon: r.icon || "",
      iconKind: r.iconKind || "",
      reason: r.reason || "",
      detail: r.detail || "",
      status: r.status || "pending",
      createdAt: r.createdAt,
      reporter: {
        username: r.reporterUsername,
        nickname: r.reporterNickname || r.reporterUsername,
      },
    }));
}

function setReportStatus(db, id, status) {
  db.prepare("UPDATE reports SET status = ? WHERE id = ?").run(status, id);
  return db.prepare("SELECT * FROM reports WHERE id = ?").get(id);
}

/* ---------- 头像审核 ---------- */

function createAvatarRequest(db, userId, avatarUrl) {
  const id = "avr-" + crypto.randomUUID().slice(0, 8);
  db.prepare(
    "INSERT INTO avatar_requests (id, user_id, avatar_url, status, created_at) VALUES (?, ?, ?, 'pending', ?)"
  ).run(id, userId, avatarUrl, new Date().toISOString());
  return db.prepare("SELECT * FROM avatar_requests WHERE id = ?").get(id);
}

function listAvatarRequests(db) {
  return db
    .prepare(
      `SELECT a.id, a.user_id AS userId, a.avatar_url AS avatarUrl, a.status, a.created_at AS createdAt,
              u.username, u.nickname
       FROM avatar_requests a JOIN users u ON u.id = a.user_id
       ORDER BY a.created_at DESC`
    )
    .all()
    .map((r) => ({
      id: r.id,
      userId: r.userId,
      avatarUrl: r.avatarUrl,
      status: r.status,
      createdAt: r.createdAt,
      user: {
        username: r.username,
        nickname: r.nickname || r.username,
      },
    }));
}

function setAvatarRequestStatus(db, id, status) {
  const row = db.prepare("SELECT * FROM avatar_requests WHERE id = ?").get(id);
  if (!row) return null;
  db.prepare("UPDATE avatar_requests SET status = ? WHERE id = ?").run(status, id);
  if (status === "approved") {
    db.prepare("UPDATE users SET avatar_url = ? WHERE id = ?").run(row.avatar_url, row.user_id);
  }
  return db.prepare("SELECT * FROM avatar_requests WHERE id = ?").get(id);
}

module.exports = {
  DB_PATH,
  connect,
  init,
  listExpos,
  getExpo,
  teamCountByExpo,
  listTeams,
  getTeam,
  createTeam,
  createExpo,
  updateExpo,
  deleteExpo,
  updateTeam,
  deleteTeam,
  getState,
  setState,
  hashPassword,
  verifyPassword,
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  addExp,
  createSession,
  getUserBySession,
  deleteSession,
  listTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
  setTeamStatus,
  createTeamRequest,
  listTeamRequests,
  getTeamRequest,
  getPendingRequestCount,
  setTeamRequestStatus,
  getTeamRequestRow,
  createReport,
  listReports,
  setReportStatus,
  createAvatarRequest,
  listAvatarRequests,
  setAvatarRequestStatus,
};
