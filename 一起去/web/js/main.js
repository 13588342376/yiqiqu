/* 一起去 · 高保真 Web 原型（纯前端 + mock 数据） */

const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M13 5v2M13 11v2M13 17v2"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h3a3 3 0 0 0 3-3V8"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  train: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16M12 3v8"/><circle cx="8" cy="16.5" r="1"/><circle cx="16" cy="16.5" r="1"/></svg>',
  hotel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M2 9h18a2 2 0 0 1 2 2v9M2 18h20M6 9v9"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 18.5 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.2 6.2-6.2 2.2 2.2-6.2Z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.09a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.09a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H6"/></svg>',
};

function icon(name) {
  return ICONS[name] || "";
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

let EXPOS = [];
let TEAMS = [];

let CITIES = ["全部"];
const TIMES = ["全部", "近一个月", "近三个月"];

const NAV = [
  { view: "home", label: "漫展发现", icon: "compass" },
  { view: "my-teams", label: "我的队伍", icon: "users", badge: true },
  { view: "trip", label: "行程", icon: "route" },
  { view: "profile", label: "个人中心", icon: "user" },
];

const NAME_POOL = ["阿茗", "小K", "Momo", "橙子", "北北", "阿泽", "汐", "栗子", "洛洛", "小满", "清禾", "十七"];
const COLOR_POOL = ["linear-gradient(135deg,#f43f5e,#ff8a5c)", "linear-gradient(135deg,#0ea5e9,#6366f1)", "linear-gradient(135deg,#0d9488,#22c55e)", "linear-gradient(135deg,#f59e0b,#ef4444)", "linear-gradient(135deg,#7c3aed,#ec4899)"];

const state = {
  view: "home",
  city: "全部",
  time: "全部",
  query: "",
  expoId: null,
  teamId: null,
  expoTab: "teams",
  favs: new Set(),
  applied: new Set(),
  joined: new Set(),
};

const $nav = document.getElementById("nav");
const $topbar = document.getElementById("topbar");
const $view = document.getElementById("view");
const $modal = document.getElementById("modal");
const $toast = document.getElementById("toast");

let toastTimer;
function toast(msg) {
  $toast.textContent = msg;
  $toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($toast.hidden = true), 2200);
}

function findExpo(id) {
  return EXPOS.find((e) => e.id === id);
}
function findTeam(id) {
  return TEAMS.find((t) => t.id === id);
}

function coverStyle(e) {
  if (e.coverImage) {
    return "background-image:url('" + e.coverImage + "');background-size:cover;background-position:center";
  }
  return "background:" + (e.cover || "");
}

function coverClass(e) {
  return e.coverImage ? " has-img" : "";
}

function teamsFor(expoId) {
  return TEAMS.filter((t) => t.expoId === expoId);
}

function myTeams() {
  return TEAMS.filter((t) => state.joined.has(t.id) || state.applied.has(t.id));
}

function membersFor(team) {
  const n = team.size;
  const list = [{ name: team.leader, role: "领队", leader: true }];
  for (let i = 1; i < n; i++) {
    list.push({ name: NAME_POOL[(i * 3 + team.id.length) % NAME_POOL.length], role: "队员" });
  }
  return list;
}

function teamButton(t) {
  if (state.joined.has(t.id)) return '<button class="btn btn-teal btn-sm" data-action="joined">' + icon("check") + "已加入</button>";
  if (state.applied.has(t.id)) return '<button class="btn btn-ghost btn-sm" data-action="applied">已申请</button>';
  return '<button class="btn btn-primary btn-sm" data-action="apply" data-id="' + t.id + '">' + icon("arrow") + "申请加入</button>";
}

/* ---------- Topbar ---------- */
function renderTopbar() {
  if (state.view === "home") {
    $topbar.innerHTML =
      '<div class="topbar-title"><h1>漫展发现</h1></div>' +
      '<span class="topbar-spacer"></span>' +
      '<div class="searchbox">' + icon("search") + '<input id="search-input" placeholder="搜索漫展、城市、场地" value="' + esc(state.query) + '" /></div>';
    return;
  }

  if (state.view === "expo-detail") {
    const e = findExpo(state.expoId);
    $topbar.innerHTML =
      '<button class="back-btn" data-action="back">' + icon("left") + "</button>" +
      '<div class="topbar-title"><h1>' + esc(e.name) + "</h1></div>" +
      '<span class="topbar-spacer"></span>' +
      '<span class="breadcrumb">首页 / <b>' + esc(e.city) + "</b></span>" +
      '<button class="btn btn-ghost" data-action="toggle-fav">' + icon("heart") + (state.favs.has(e.id) ? "已收藏" : "收藏") + "</button>" +
      '<button class="btn btn-primary" data-action="open-team-create">' + icon("plus") + "创建队伍</button>";
    return;
  }

  if (state.view === "team-detail") {
    const t = findTeam(state.teamId);
    const e = findExpo(t.expoId);
    $topbar.innerHTML =
      '<button class="back-btn" data-action="back">' + icon("left") + "</button>" +
      '<div class="topbar-title"><h1>' + esc(t.name) + "</h1></div>" +
      '<span class="topbar-spacer"></span>' +
      '<span class="breadcrumb">首页 / ' + esc(e.name) + " / <b>队伍</b></span>";
    return;
  }

  const meta = { "my-teams": ["我的队伍", "我加入与申请的队伍"], trip: ["我的行程", "出发前需要确认的事项"], profile: ["个人中心", "资料与设置"] }[state.view];
  $topbar.innerHTML = '<div class="topbar-title"><h1>' + meta[0] + "</h1></div><span class='topbar-spacer'></span><span class='breadcrumb'>" + meta[1] + "</span>";
}

/* ---------- Views ---------- */
function renderHome() {
  let list = EXPOS;
  if (state.city !== "全部") list = list.filter((e) => e.city === state.city);
  if (state.time === "近一个月") list = list.filter((e) => e.start <= "2026-05-31");
  if (state.time === "近三个月") list = list.filter((e) => e.start <= "2026-06-30");
  if (state.query) {
    const q = state.query.toLowerCase();
    list = list.filter((e) => (e.name + e.city + e.venue).toLowerCase().includes(q));
  }

  const cityChips = CITIES.map((c) => '<button class="chip' + (state.city === c ? " active" : "") + '" data-filter="city" data-value="' + esc(c) + '">' + esc(c) + "</button>").join("");
  const timeChips = TIMES.map((t) => '<button class="chip' + (state.time === t ? " active" : "") + '" data-filter="time" data-value="' + esc(t) + '">' + esc(t) + "</button>").join("");

  const cards = list
    .map((e) => {
      const teams = teamsFor(e.id).length;
      return (
        '<article class="expo-card" data-open-expo="' + e.id + '">' +
        '<div class="expo-cover' + coverClass(e) + '" style="' + coverStyle(e) + '">' +
        '<span class="cover-city">' + esc(e.city) + " · " + esc(e.days) + "</span>" +
        '<button class="fav-btn' + (state.favs.has(e.id) ? " on" : "") + '" data-action="fav" data-id="' + e.id + '">' + icon("heart") + "</button>" +
        '<span class="cover-glyph">' + esc(e.glyph) + "</span>" +
        "</div>" +
        '<div class="expo-body">' +
        '<h3 class="expo-name">' + esc(e.name) + "</h3>" +
        '<div class="expo-meta">' +
        "<span>" + icon("calendar") + esc(e.start) + " - " + esc(e.end) + "</span>" +
        "<span>" + icon("pin") + esc(e.venue) + "</span>" +
        "</div>" +
        '<div class="expo-foot">' +
        e.tags.map((t, i) => '<span class="tag ' + ["tag-rose", "tag-teal", "tag-amber", "tag-sky"][i % 4] + '">' + esc(t) + "</span>").join("") +
        '<span class="teams-count">' + icon("users") + esc(teams) + " 支同行队伍</span>" +
        "</div>" +
        "</div>" +
        "</article>"
      );
    })
    .join("");

  $view.innerHTML =
    '<div class="home-hero">' +
    "<div>" +
    "<h2>找到同行的人，去同一个漫展</h2>" +
    "<p>从找展、买票、组团到行程，一个地方全部搞定。</p>" +
    "</div>" +
    "</div>" +
    '<div class="filters">' +
    '<span class="filter-label">' + icon("filter") + "城市</span>" +
    cityChips +
    '<span class="filter-label" style="margin-left:10px">时间</span>' +
    timeChips +
    "</div>" +
    '<div class="section-head"><h3>近期漫展</h3><span class="muted">共 ' + list.length + " 场</span></div>" +
    (list.length ? '<div class="expo-grid">' + cards + "</div>" : '<div class="empty">' + icon("compass") + "<p>没有找到符合条件的漫展</p></div>");
}

function renderExpoDetail() {
  const e = findExpo(state.expoId);
  if (!e) return;
  const teams = teamsFor(e.id);

  const info = [
    ["漫展名称", e.name],
    ["举办城市", e.city],
    ["场馆", e.venue],
    ["时间", e.start + " - " + e.end],
    ["规模", e.scale],
    ["类型", e.tags.join(" / ")],
  ]
    .map((r) => '<div class="info-row"><span class="k">' + r[0] + '</span><span class="v">' + esc(r[1]) + "</span></div>")
    .join("");

  const teamCards = teams
    .map((t) => {
      return (
        '<div class="team-card" data-open-team="' + t.id + '">' +
        '<span class="team-avatar" style="background:' + t.color + '">' + esc(t.leader[0]) + "</span>" +
        '<div class="team-main">' +
        '<h4 class="team-name">' + esc(t.name) + "</h4>" +
        '<div class="team-sub"><span>' + icon("pin") + esc(t.from) + "</span><span>" + icon("train") + esc(t.mode) + "</span></div>" +
        '<div class="team-tags">' + t.tags.map((x) => '<span class="tag tag-teal">' + esc(x) + "</span>").join("") + "</div>" +
        "</div>" +
        '<div class="team-right">' +
        '<div class="team-count">' + t.size + "<small> / " + t.cap + " 人</small></div>" +
        teamButton(t) +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  const tabBtn = (key, label) => '<button class="tab' + (state.expoTab === key ? " active" : "") + '" data-tab="' + key + '">' + label + "</button>";

  let tabBody = "";
  if (state.expoTab === "teams") {
    tabBody =
      '<div class="section-head"><h3>同行队伍</h3><span class="muted">' + teams.length + ' 支队伍正在找同行者</span></div>' +
      (teams.length ? '<div class="team-list">' + teamCards + "</div>" : '<div class="empty">' + icon("users") + "<p>还没有队伍，来创建第一支吧</p></div>");
  } else if (state.expoTab === "info") {
    tabBody =
      '<div class="panel"><h4>漫展信息</h4><div class="info-list">' + info + "</div></div>" +
      '<div class="panel" style="margin-top:14px"><h4>漫展介绍</h4><p style="color:var(--ink-2);font-size:13px;margin:0">' + esc(e.desc) + "</p></div>";
  } else {
    tabBody =
      '<div class="panel"><h4>购票</h4>' +
      '<p style="color:var(--ink-2);font-size:13px;margin:0 0 14px">V1.0 先提供官方购票入口与第三方平台跳转，接入票务 API 后再做站内购票。</p>' +
      '<div class="expo-actions">' +
      '<button class="btn btn-teal" data-action="ticket">' + icon("ticket") + "前往官方购票</button>" +
      '<button class="btn btn-ghost" data-action="ticket">' + icon("external") + "跳转第三方平台</button>" +
      "</div></div>";
  }

  $view.innerHTML =
    '<div class="expo-hero">' +
    '<div class="expo-hero-cover' + coverClass(e) + '" style="' + coverStyle(e) + '">' +
    '<span class="cover-glyph">' + esc(e.glyph) + "</span>" +
    '<div class="kicker">' + esc(e.city) + " · " + esc(e.days) + "</div>" +
    "<h2>" + esc(e.name) + "</h2>" +
    '<div class="expo-hero-stats">' +
    "<span class='stat'>" + icon("calendar") + esc(e.start) + " - " + esc(e.end) + "</span>" +
    "<span class='stat'>" + icon("pin") + esc(e.venue) + "</span>" +
    "<span class='stat'>" + icon("users") + esc(e.scale) + "</span>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="expo-actions">' +
    '<button class="btn btn-teal" data-action="ticket">' + icon("ticket") + "购票</button>" +
    '<button class="btn btn-primary" data-action="open-team-create">' + icon("plus") + "创建队伍</button>" +
    '<button class="btn btn-ghost" data-action="tab-teams">' + icon("users") + "找同行者</button>" +
    '<button class="btn btn-ghost" data-action="trip-plan">' + icon("route") + "行程</button>" +
    "</div>" +
    '<div class="tabs">' + tabBtn("teams", "同行队伍") + tabBtn("info", "漫展信息") + tabBtn("ticket", "购票") + "</div>" +
    tabBody;
}

function renderTeamDetail() {
  const t = findTeam(state.teamId);
  if (!t) return;
  const e = findExpo(t.expoId);
  const members = membersFor(t);

  const memberCards = members
    .map((m, i) => {
      return (
        '<div class="member-card">' +
        '<span class="avatar" style="background:' + COLOR_POOL[(i + t.id.length) % COLOR_POOL.length] + '">' + esc(m.name[0]) + "</span>" +
        "<div>" +
        '<div class="nm">' + esc(m.name) + (m.leader ? ' <span class="leader-badge">' + icon("star") + "领队</span>" : "") + "</div>" +
        '<div class="role">' + esc(m.role) + "</div>" +
        "</div>" +
        "</div>"
      );
    })
    .join("");

  const infoRows = [
    ["出发地", t.from],
    ["出行方式", t.mode],
    ["所属漫展", e.name],
    ["集合方式", "漫展当天在 " + e.venue + " 门口集合"],
    ["联系方式", "平台内私信（保护隐私）"],
  ]
    .map((r) => '<div class="info-row"><span class="k">' + r[0] + '</span><span class="v">' + esc(r[1]) + "</span></div>")
    .join("");

  const primaryBtn = state.joined.has(t.id)
    ? '<button class="btn btn-teal" data-action="joined">' + icon("check") + "已加入队伍</button>"
    : state.applied.has(t.id)
      ? '<button class="btn btn-ghost" data-action="applied">已申请，等待领队确认</button>'
      : '<button class="btn btn-primary" data-action="apply" data-id="' + t.id + '">' + icon("arrow") + "申请加入队伍</button>";

  $view.innerHTML =
    '<div class="team-detail-head">' +
    '<span class="team-avatar" style="background:' + t.color + '">' + esc(t.leader[0]) + "</span>" +
    '<div style="min-width:0">' +
    "<h2>" + esc(t.name) + "</h2>" +
    '<div class="sub"><span>' + icon("pin") + esc(t.from) + "</span><span>" + icon("train") + esc(t.mode) + "</span><span>" + icon("calendar") + esc(e.start) + "</span></div>" +
    '<div class="progress"><span style="width:' + Math.round((t.size / t.cap) * 100) + '%"></span></div>' +
    "</div>" +
    '<div class="spacer"></div>' +
    primaryBtn +
    '<button class="btn btn-ghost" data-action="contact">' + icon("msg") + "联系领队</button>" +
    "</div>" +
    '<div class="detail-panel">' +
    "<div>" +
    '<div class="panel" style="margin-bottom:16px"><h4>队伍信息</h4><div class="info-list">' + infoRows + "</div></div>" +
    '<div class="panel"><h4>成员（' + t.size + " / " + t.cap + "）</h4><div class='member-grid'>" + memberCards + "</div></div>" +
    "</div>" +
    '<div class="panel"><h4>队伍交流</h4><p style="color:var(--ink-3);font-size:13px;margin:0 0 12px">加入后即可在平台内与队友沟通，无需跳转到其他群。</p>' +
    '<div class="empty" style="padding:28px 8px">' + icon("msg") + "<p>加入队伍后可发起聊天</p></div></div>" +
    "</div>";
}

function renderMyTeams() {
  const list = myTeams();
  const rows = list
    .map((t) => {
      const e = findExpo(t.expoId);
      const joined = state.joined.has(t.id);
      return (
        '<div class="list-row" data-open-team="' + t.id + '">' +
        '<span class="avatar" style="background:' + t.color + '">' + esc(t.leader[0]) + "</span>" +
        '<div class="grow">' +
        '<div class="t">' + esc(t.name) + "</div>" +
        '<div class="s">' + esc(e.name) + " · " + esc(t.from) + " · " + esc(t.mode) + "</div>" +
        "</div>" +
        '<span class="status-pill ' + (joined ? "teal" : "amber") + '">' + (joined ? "已加入" : "待确认") + "</span>" +
        icon("right").replace("<svg", '<svg class="chevron"') +
        "</div>"
      );
    })
    .join("");

  $view.innerHTML =
    '<div class="section-head"><h3>我的队伍</h3><span class="muted">' + list.length + " 支</span></div>" +
    (list.length ? '<div class="list-stack">' + rows + "</div>" : '<div class="empty">' + icon("users") + "<p>还没有加入任何队伍，去漫展详情页看看吧</p></div>");
}

function renderTrip() {
  $view.innerHTML =
    '<div class="trip-layout">' +
    '<div class="panel">' +
    '<h4>杭州 CICAF · 行程安排</h4>' +
    '<div class="timeline">' +
    '<div class="timeline-item done"><div class="time">10-02 08:30</div><div class="title">杭州东站集合</div><div class="desc">高铁抵达后，东站地铁口集合</div></div>' +
    '<div class="timeline-item done"><div class="time">09:10</div><div class="title">出发前往白马湖会展中心</div><div class="desc">地铁 1 号线转 6 号线，约 40 分钟</div></div>' +
    '<div class="timeline-item"><div class="time">10:00</div><div class="title">入场 / 检票</div><div class="desc">凭电子票二维码入场，先拍集体照</div></div>' +
    '<div class="timeline-item"><div class="time">10:30 - 18:00</div><div class="title">自由逛展 + 摊位巡游</div><div class="desc">按兴趣分组行动，午间一起吃饭</div></div>' +
    '<div class="timeline-item"><div class="time">18:30</div><div class="title">集合返程</div><div class="desc">会展中心门口集合，各自返程</div></div>' +
    "</div>" +
    "</div>" +
    '<div class="panel"><h4>出发前待办</h4><div class="checklist">' +
    '<div class="check-item done"><span class="box">' + icon("check") + "</span>电子票已领取</div>" +
    '<div class="check-item done"><span class="box">' + icon("check") + "</span>车票已预订</div>" +
    '<div class="check-item"><span class="box"></span>确认集合时间与地点</div>' +
    '<div class="check-item"><span class="box"></span>准备充电宝与轻便装备</div>' +
    '<div class="check-item"><span class="box"></span>与队友确认联系方式</div>' +
    "</div>" +
    '<button class="btn btn-ghost" style="width:100%;margin-top:14px" data-action="toast">' + icon("plus") + "添加待办</button>" +
    "</div>" +
    "</div>";
}

function renderProfile() {
  $view.innerHTML =
    '<div class="profile-head">' +
    '<span class="avatar avatar-grad">汐</span>' +
    "<div>" +
    "<h2>赵绪辉</h2>" +
    '<div class="sub">Lv.3 同行达人 · 上海 · 已实名认证</div>' +
    "</div>" +
    '<div class="spacer" style="flex:1"></div>' +
    '<button class="btn btn-ghost" data-action="toast">编辑资料</button>' +
    "</div>" +
    '<div class="stat-row">' +
    '<div class="stat-card"><div class="num">12</div><div class="lbl">参加过的漫展</div></div>' +
    '<div class="stat-card"><div class="num">5</div><div class="lbl">同行队伍</div></div>' +
    '<div class="stat-card"><div class="num">28</div><div class="lbl">同行伙伴</div></div>' +
    "</div>" +
    '<div class="settings-list">' +
    '<button class="settings-item" data-action="toast">' + icon("user") + "账号与资料<span class='chevron'>" + icon("right") + "</span></button>" +
    '<button class="settings-item" data-action="toast">' + icon("shield") + "隐私与联系方式保护<span class='chevron'>" + icon("right") + "</span></button>" +
    '<button class="settings-item" data-action="toast">' + icon("book") + "我的收藏<span class='chevron'>" + icon("right") + "</span></button>" +
    '<button class="settings-item" data-action="toast">' + icon("flag") + "反馈与帮助<span class='chevron'>" + icon("right") + "</span></button>" +
    '<button class="settings-item" data-action="toast">' + icon("settings") + "设置<span class='chevron'>" + icon("right") + "</span></button>" +
    "</div>";
}

/* ---------- Modal ---------- */
function openTeamCreate() {
  const e = findExpo(state.expoId);
  $modal.innerHTML =
    '<div class="modal">' +
    '<div class="modal-head"><h3>创建同行队伍</h3><button class="close" data-action="close-modal">' + icon("x") + "</button></div>" +
    '<form class="form-grid" id="team-form">' +
    '<div class="field"><label>所属漫展</label><input value="' + esc(e.name) + '" disabled /></div>' +
    '<div class="field"><label>队伍名称</label><input name="name" placeholder="例如：上海出发 · CP找搭子" required /></div>' +
    '<div class="field"><label>出发地</label><input name="from" placeholder="例如：上海·虹桥" required /></div>' +
    '<div class="field"><label>出行方式</label><select name="mode"><option>高铁</option><option>自驾</option><option>地铁</option><option>公交</option><option>拼车</option></select></div>' +
    '<div class="field"><label>目标人数</label><select name="cap"><option>3</option><option>4</option><option>5</option><option>6</option><option>8</option></select></div>' +
    '<div class="field"><label>备注（标签 / 需求）</label><textarea name="tags" placeholder="例如：摄影、当天往返、新手友好"></textarea></div>' +
    '<div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">取消</button><button type="submit" class="btn btn-primary">' + icon("check") + "创建队伍</button></div>" +
    "</form>" +
    "</div>";
  $modal.hidden = false;
}

function closeModal() {
  $modal.hidden = true;
}

/* ---------- Router ---------- */
function go(view, opts = {}) {
  state.view = view;
  if (opts.expoId !== undefined) state.expoId = opts.expoId;
  if (opts.teamId !== undefined) state.teamId = opts.teamId;
  if (opts.expoTab) state.expoTab = opts.expoTab;
  render();
  window.scrollTo(0, 0);
}

function render() {
  renderNav();
  renderTopbar();
  if (state.view === "home") renderHome();
  else if (state.view === "expo-detail") renderExpoDetail();
  else if (state.view === "team-detail") renderTeamDetail();
  else if (state.view === "my-teams") renderMyTeams();
  else if (state.view === "trip") renderTrip();
  else if (state.view === "profile") renderProfile();
}

function renderNav() {
  $nav.innerHTML = NAV.map((n) => {
    const badge = n.badge && (state.joined.size + state.applied.size) > 0 ? '<span class="nav-badge">' + (state.joined.size + state.applied.size) + "</span>" : "";
    return '<button class="nav-item' + (state.view === n.view ? " active" : "") + '" data-view="' + n.view + '">' + icon(n.icon) + "<span>" + n.label + "</span>" + badge + "</button>";
  }).join("");
}

/* ---------- Events ---------- */
document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-action],[data-view],[data-open-expo],[data-open-team],[data-filter],[data-tab]");
  if (!el) return;

  if (el.hasAttribute("data-view")) {
    go(el.dataset.view);
    return;
  }
  if (el.hasAttribute("data-open-expo")) {
    go("expo-detail", { expoId: el.dataset.openExpo, expoTab: "teams" });
    return;
  }
  if (el.hasAttribute("data-open-team")) {
    go("team-detail", { teamId: el.dataset.openTeam });
    return;
  }
  if (el.hasAttribute("data-filter")) {
    state[el.dataset.filter] = el.dataset.value;
    render();
    return;
  }
  if (el.hasAttribute("data-tab")) {
    state.expoTab = el.dataset.tab;
    render();
    return;
  }

  const action = el.dataset.action;
  if (action === "back") {
    if (state.view === "team-detail") {
      const t = findTeam(state.teamId);
      go("expo-detail", { expoId: t.expoId, expoTab: "teams" });
    } else {
      go("home");
    }
    return;
  }
  if (action === "fav") {
    const id = el.dataset.id;
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    saveState();
    render();
    return;
  }
  if (action === "toggle-fav") {
    const id = state.expoId;
    const on = !state.favs.has(id);
    on ? state.favs.add(id) : state.favs.delete(id);
    saveState();
    toast(on ? "已收藏" : "已取消收藏");
    renderTopbar();
    return;
  }
  if (action === "apply") {
    state.applied.add(el.dataset.id);
    saveState();
    toast("已提交申请，等待领队确认");
    render();
    return;
  }
  if (action === "joined") {
    toast("你已加入该队伍");
    return;
  }
  if (action === "applied") {
    toast("申请已提交，请等待领队确认");
    return;
  }
  if (action === "contact") {
    toast("已通过平台内私信联系领队（演示）");
    return;
  }
  if (action === "ticket") {
    toast("将跳转到官方购票 / 第三方平台（演示）");
    return;
  }
  if (action === "trip-plan") {
    go("trip");
    return;
  }
  if (action === "tab-teams") {
    state.expoTab = "teams";
    render();
    return;
  }
  if (action === "open-team-create") {
    openTeamCreate();
    return;
  }
  if (action === "close-modal") {
    closeModal();
    return;
  }
  if (action === "toast") {
    toast("此功能为原型演示占位");
    return;
  }
});

document.addEventListener("submit", async (ev) => {
  if (ev.target.id !== "team-form") return;
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const e = findExpo(state.expoId);
  const payload = {
    expoId: e.id,
    name: fd.get("name").trim(),
    leader: "汐",
    from: fd.get("from").trim(),
    mode: fd.get("mode"),
    size: 1,
    cap: Number(fd.get("cap")),
    tags: fd.get("tags").trim() ? fd.get("tags").split(/[,，、\s]+/).slice(0, 3) : ["新手友好"],
    color: COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)],
  };
  const created = await fetch("/api/teams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
  TEAMS.push(created);
  state.joined.add(created.id);
  saveState();
  closeModal();
  toast("队伍创建成功，已自动加入");
  go("team-detail", { teamId: created.id });
});

document.addEventListener("input", (ev) => {
  if (ev.target.id === "search-input") {
    state.query = ev.target.value;
    const grid = document.querySelector(".expo-grid");
    if (grid) renderHome();
  }
});

$modal.addEventListener("click", (ev) => {
  if (ev.target === $modal) closeModal();
});

async function saveState() {
  await fetch("/api/state", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      favorites: [...state.favs],
      joined: [...state.joined],
      applied: [...state.applied],
    }),
  });
}

async function init() {
  try {
    const [exposRes, teamsRes, stateRes] = await Promise.all([
      fetch("/api/expos"),
      fetch("/api/teams"),
      fetch("/api/state"),
    ]);
    EXPOS = await exposRes.json();
    TEAMS = await teamsRes.json();
    const s = await stateRes.json();
    state.favs = new Set(s.favorites || []);
    state.joined = new Set(s.joined || []);
    state.applied = new Set(s.applied || []);
    CITIES = ["全部", ...new Set(EXPOS.map((e) => e.city))];
  } catch (e) {
    console.error("加载数据失败：", e);
  }
  render();
}

init();
