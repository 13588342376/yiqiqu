// 数据库层：使用 Node 内置的 node:sqlite，无需任何外部依赖。
const { DatabaseSync } = require("node:sqlite");
const path = require("node:path");

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
      from_city  TEXT,
      mode       TEXT,
      size       INTEGER DEFAULT 1,
      cap        INTEGER DEFAULT 5,
      color      TEXT,
      tags       TEXT,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS user_state (
      id   INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL
    );
  `);

  const expoCols = db.prepare("PRAGMA table_info(expos)").all().map((c) => c.name);
  if (!expoCols.includes("cover_image")) {
    db.exec("ALTER TABLE expos ADD COLUMN cover_image TEXT");
  }

  const existing = db.prepare("SELECT id FROM user_state WHERE id = 1").get();
  if (!existing) {
    const empty = JSON.stringify({ favorites: [], joined: [], applied: [] });
    db.prepare("INSERT INTO user_state (id, data) VALUES (1, ?)").run(empty);
  }

  return db;
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
    from: row.from_city,
    mode: row.mode,
    size: row.size,
    cap: row.cap,
    color: row.color,
    tags: parseTags(row.tags),
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
    `INSERT INTO teams (id, expo_id, name, leader, from_city, mode, size, cap, color, tags, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    team.expoId,
    team.name,
    team.leader || "汐",
    team.from || "",
    team.mode || "地铁",
    1,
    Number(team.cap) || 5,
    team.color || "",
    JSON.stringify(team.tags || []),
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
  db.prepare("DELETE FROM teams WHERE id = ?").run(id);
}

function getState(db) {
  const row = db.prepare("SELECT data FROM user_state WHERE id = 1").get();
  if (!row) return { favorites: [], joined: [], applied: [] };
  try {
    return JSON.parse(row.data);
  } catch {
    return { favorites: [], joined: [], applied: [] };
  }
}

function setState(db, data) {
  db.prepare("UPDATE user_state SET data = ? WHERE id = 1").run(JSON.stringify(data));
  return getState(db);
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
};
