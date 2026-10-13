/* 一起去 · Web 客户端（纯前端，数据来自本地 API） */

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

const BANNERS = [
  {
    title: "找到同行的人，去同一个漫展",
    sub: "从找展、买票、组团到行程，一个地方全部搞定。",
    bg: "linear-gradient(120deg,#ff5f7a 0%,#f43f5e 42%,#ff8a5c 100%)",
  },
  {
    title: "CP 同人展 · 上海",
    sub: "国内规模最大的综合同人创作展，找到一起逛摊的搭子。",
    bg: "linear-gradient(120deg,#0ea5e9 0%,#2563eb 55%,#6366f1 100%)",
  },
  {
    title: "广州萤火虫动漫游戏嘉年华",
    sub: "华南人气动漫游戏综合展，组队看展更尽兴。",
    bg: "linear-gradient(120deg,#0d9488 0%,#14b8a6 55%,#22c55e 100%)",
  },
];

const TEAM_EMOJIS = ["🎭", "📷", "🎮", "🚄", "🏙️", "🎪", "✨", "🍡", "🛼", "🎫", "🧭", "🎧", "🍵", "🎨", "🧩", "🎯"];

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
  user: null,
  todos: [],
  userMenu: false,
  favOnly: false,
  bannerIndex: 0,
  cityMenu: false,
  myTeamsFilter: "all",
};

const $nav = document.getElementById("nav");
const $topbar = document.getElementById("topbar");
const $view = document.getElementById("view");
const $modal = document.getElementById("modal");
const $toast = document.getElementById("toast");
const $sidebarUser = document.getElementById("sidebar-user");

let toastTimer;
function toast(msg) {
  $toast.textContent = msg;
  $toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($toast.hidden = true), 2200);
}

async function api(url, options = {}) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "请求失败");
    err.status = res.status;
    throw err;
  }
  return data;
}

function requireLogin() {
  if (state.user) return true;
  openAuth("login");
  return false;
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

function teamIconHtml(t, extraClass) {
  const cls = "team-avatar" + (extraClass ? " " + extraClass : "");
  if (t.iconKind === "image" && t.icon) {
    return '<span class="' + cls + '"><img src="' + esc(t.icon) + '" alt="队伍图标" /></span>';
  }
  if (t.icon) {
    return '<span class="' + cls + ' emoji">' + esc(t.icon) + "</span>";
  }
  return '<span class="' + cls + '" style="background:' + esc(t.color) + '">' + esc(t.leader[0]) + "</span>";
}

function filteredExpos() {
  let list = EXPOS;
  if (state.city !== "全部") list = list.filter((e) => e.city === state.city);
  if (state.time !== "全部") {
    const today = new Date();
    const limit = new Date(today);
    limit.setDate(today.getDate() + (state.time === "近一个月" ? 30 : 90));
    const limitStr = limit.toISOString().slice(0, 10);
    list = list.filter((e) => e.start <= limitStr);
  }
  if (state.query) {
    const q = state.query.trim().toLowerCase();
    list = list.filter((e) =>
      (e.name + " " + e.city + " " + e.venue + " " + e.glyph + " " + (e.tags || []).join(" ")).toLowerCase().includes(q)
    );
  }
  return list;
}

function teamsFor(expoId) {
  return TEAMS.filter((t) => t.expoId === expoId);
}

function myTeams() {
  return TEAMS.filter(
    (t) => state.joined.has(t.id) || state.applied.has(t.id) || (state.user && t.leaderUserId === state.user.id)
  );
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

  const meta = { "my-teams": ["我的队伍", "我加入与申请的队伍"], trip: ["我的行程", "出发前需要确认的事项"], profile: ["个人中心", "资料与设置"], favorites: ["我的收藏", "我收藏的漫展"] }[state.view];
  $topbar.innerHTML = '<div class="topbar-title"><h1>' + meta[0] + "</h1></div><span class='topbar-spacer'></span><span class='breadcrumb'>" + meta[1] + "</span>";
}

/* ---------- Views ---------- */
function renderHome() {
  const list = filteredExpos();

  const timeChips = TIMES.map((t) => '<button class="chip' + (state.time === t ? " active" : "") + '" data-filter="time" data-value="' + esc(t) + '">' + esc(t) + "</button>").join("");
  const cityOptions = CITIES.map(
    (c) => '<button class="city-option' + (state.city === c ? " active" : "") + '" data-filter="city" data-value="' + esc(c) + '">' + esc(c) + "</button>"
  ).join("");
  const slides = BANNERS.map(
    (b, i) =>
      '<div class="banner-slide' + (i === state.bannerIndex ? " active" : "") + '" style="background:' + b.bg + '">' +
      "<div>" +
      "<h2>" + esc(b.title) + "</h2>" +
      "<p>" + esc(b.sub) + "</p>" +
      "</div>" +
      "</div>"
  ).join("");
  const dots = BANNERS.map(
    (b, i) => '<button class="banner-dot' + (i === state.bannerIndex ? " active" : "") + '" data-action="banner-goto" data-index="' + i + '"></button>'
  ).join("");

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

  startBannerTimer();
  $view.innerHTML =
    '<div class="home-hero banner">' +
    '<div class="banner-track" style="transform:translateX(-' + state.bannerIndex * 100 + '%)">' + slides + "</div>" +
    '<div class="banner-arrows">' +
    '<button class="banner-btn" data-action="banner-prev">' + icon("left") + "</button>" +
    '<button class="banner-btn" data-action="banner-next">' + icon("right") + "</button>" +
    "</div>" +
    '<div class="banner-dots">' + dots + "</div>" +
    "</div>" +
    '<div class="filters">' +
    '<div class="city-drop">' +
    '<button class="city-drop-btn" data-action="toggle-city-menu">' + icon("pin") + "<span>" + esc(state.city) + "</span>" + icon("right").replace("<svg", '<svg class="chevron"') + "</button>" +
    '<div class="city-menu"' + (state.cityMenu ? "" : " hidden") + ">" + cityOptions + "</div>" +
    "</div>" +
    '<span class="filter-label" style="margin-left:8px">' + icon("filter") + "时间</span>" +
    timeChips +
    "</div>" +
    '<div class="section-head"><h3>近期漫展</h3><span class="muted">共 ' + list.length + " 场</span></div>" +
    (list.length ? '<div class="expo-grid">' + cards + "</div>" : '<div class="empty">' + icon("compass") + "<p>没有找到符合条件的漫展</p></div>");
}

function startBannerTimer() {
  clearInterval(window.__bannerTimer);
  window.__bannerTimer = setInterval(() => {
    state.bannerIndex = (state.bannerIndex + 1) % BANNERS.length;
    const track = document.querySelector(".banner-track");
    const dots = document.querySelectorAll(".banner-dot");
    if (track) {
      track.style.transform = "translateX(-" + state.bannerIndex * 100 + "%)";
      track.querySelectorAll(".banner-slide").forEach((s, i) => s.classList.toggle("active", i === state.bannerIndex));
      dots.forEach((d, i) => d.classList.toggle("active", i === state.bannerIndex));
    }
  }, 4200);
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
        teamIconHtml(t) +
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

async function renderTeamDetail() {
  const t = findTeam(state.teamId);
  if (!t) return;
  const e = findExpo(t.expoId);
  const members = membersFor(t);
  const isLeader = state.user && t.leaderUserId === state.user.id;
  const statusLabel =
    t.status === "pending"
      ? '<span class="team-status pending">审核中</span>'
      : t.status === "rejected"
        ? '<span class="team-status rejected">未通过审核</span>'
        : "";

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

  let requestPanel = "";
  if (isLeader) {
    let reqHtml = '<div class="empty" style="padding:20px 8px"><p>暂无申请</p></div>';
    try {
      const requests = await api("/api/teams/" + t.id + "/requests");
      if (requests.length) {
        reqHtml =
          '<div class="request-list">' +
          requests
            .map((r) => {
              return (
                '<div class="request-item">' +
                '<span class="avatar avatar-grad">' + esc(r.user.nickname[0] || "友") + "</span>" +
                '<div class="grow"><div class="t">' + esc(r.user.nickname) + '</div><div class="s">@' + esc(r.user.username) + " · Lv." + r.user.level + "</div></div>" +
                '<span class="status-pill ' + (r.status === "approved" ? "teal" : r.status === "rejected" ? "rose" : "amber") + '">' +
                (r.status === "approved" ? "已通过" : r.status === "rejected" ? "已拒绝" : "待处理") +
                "</span>" +
                (r.status === "pending"
                  ? '<button class="btn btn-sm btn-teal" data-action="approve-request" data-id="' + r.id + '">' + icon("check") + "通过</button>" +
                    '<button class="btn btn-sm btn-ghost" data-action="reject-request" data-id="' + r.id + '">拒绝</button>'
                  : "") +
                "</div>"
              );
            })
            .join("") +
          "</div>";
      }
    } catch (err) {
      reqHtml = '<div class="empty" style="padding:20px 8px"><p>申请列表加载失败</p></div>';
    }
    requestPanel =
      '<div class="panel" style="margin-bottom:16px"><h4>入队申请</h4>' + reqHtml + "</div>";
  }

  const reportBtn =
    state.user && !isLeader
      ? '<button class="btn btn-ghost" data-action="report">' + icon("flag") + "举报</button>"
      : "";

  $view.innerHTML =
    '<div class="team-detail-head">' +
    teamIconHtml(t, "lg") +
    '<div style="min-width:0">' +
    "<h2>" + esc(t.name) + " " + statusLabel + "</h2>" +
    '<div class="sub"><span>' + icon("pin") + esc(t.from) + "</span><span>" + icon("train") + esc(t.mode) + "</span><span>" + icon("calendar") + esc(e.start) + "</span></div>" +
    '<div class="progress"><span style="width:' + Math.round((t.size / t.cap) * 100) + '%"></span></div>' +
    "</div>" +
    '<div class="spacer"></div>' +
    primaryBtn +
    '<button class="btn btn-ghost" data-action="contact">' + icon("msg") + "联系领队</button>" +
    reportBtn +
    "</div>" +
    '<div class="detail-panel">' +
    "<div>" +
    requestPanel +
    '<div class="panel" style="margin-bottom:16px"><h4>队伍信息</h4><div class="info-list">' + infoRows + "</div></div>" +
    '<div class="panel"><h4>成员（' + t.size + " / " + t.cap + "）</h4><div class='member-grid'>" + memberCards + "</div></div>" +
    "</div>" +
    '<div class="panel"><h4>队伍交流</h4><p style="color:var(--ink-3);font-size:13px;margin:0 0 12px">加入后即可在平台内与队友沟通，无需跳转到其他群。</p>' +
    '<div class="empty" style="padding:28px 8px">' + icon("msg") + "<p>加入队伍后可发起聊天</p></div></div>" +
    "</div>";
}

function renderMyTeams() {
  if (!state.user) {
    $view.innerHTML =
      '<div class="empty" style="padding:70px 20px">' + icon("users") +
      "<p>登录后查看你加入与申请的队伍</p>" +
      '<button class="btn btn-primary" style="margin-top:8px" data-action="open-auth-login">' + icon("arrow") + "登录 / 注册</button></div>";
    return;
  }
  let list = myTeams();
  if (state.myTeamsFilter === "joined") list = list.filter((t) => state.joined.has(t.id));
  if (state.myTeamsFilter === "applied") list = list.filter((t) => state.applied.has(t.id));
  const filterTabs =
    '<div class="seg-filter">' +
    ["all", "joined", "applied"]
      .map(
        (k) =>
          '<button class="seg' +
          (state.myTeamsFilter === k ? " active" : "") +
          '" data-action="my-teams-filter" data-value="' +
          k +
          '">' +
          ({ all: "全部", joined: "已加入", applied: "待确认" }[k]) +
          "</button>"
      )
      .join("") +
    "</div>";
  const rows = list
    .map((t) => {
      const e = findExpo(t.expoId);
      const joined = state.joined.has(t.id);
      const leaderOwn = state.user && t.leaderUserId === state.user.id;
      const statusText = leaderOwn
        ? t.status === "pending"
          ? "审核中"
          : t.status === "rejected"
            ? "未通过"
            : joined
              ? "已加入"
              : "待加入"
        : joined
          ? "已加入"
          : "待确认";
      const statusCls = t.status === "pending" ? "amber" : t.status === "rejected" ? "rose" : joined ? "teal" : "amber";
      return (
        '<div class="list-row" data-open-team="' + t.id + '">' +
        teamIconHtml(t) +
        '<div class="grow">' +
        '<div class="t">' + esc(t.name) + "</div>" +
        '<div class="s">' + esc(e.name) + " · " + esc(t.from) + " · " + esc(t.mode) + "</div>" +
        "</div>" +
        '<span class="status-pill ' + statusCls + '">' + statusText + "</span>" +
        icon("right").replace("<svg", '<svg class="chevron"') +
        "</div>"
      );
    })
    .join("");

  $view.innerHTML =
    '<div class="section-head"><h3>我的队伍</h3><span class="muted">' + list.length + " 支</span></div>" +
    filterTabs +
    (list.length ? '<div class="list-stack">' + rows + "</div>" : '<div class="empty">' + icon("users") + "<p>还没有加入任何队伍，去漫展详情页看看吧</p></div>");
}

function renderFavorites() {
  if (!state.user) {
    $view.innerHTML =
      '<div class="empty" style="padding:70px 20px">' + icon("heart") +
      "<p>登录后查看你收藏的漫展</p>" +
      '<button class="btn btn-primary" style="margin-top:8px" data-action="open-auth-login">' + icon("arrow") + "登录 / 注册</button></div>";
    return;
  }
  const list = EXPOS.filter((e) => state.favs.has(e.id));
  const cards = list
    .map((e) => {
      const teams = teamsFor(e.id).length;
      return (
        '<article class="expo-card" data-open-expo="' + e.id + '">' +
        '<div class="expo-cover' + coverClass(e) + '" style="' + coverStyle(e) + '">' +
        '<span class="cover-city">' + esc(e.city) + " · " + esc(e.days) + "</span>" +
        '<button class="fav-btn on" data-action="fav" data-id="' + e.id + '">' + icon("heart") + "</button>" +
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
    '<div class="section-head"><h3>我的收藏</h3><span class="muted">共 ' + list.length + " 场</span></div>" +
    (list.length ? '<div class="expo-grid">' + cards + "</div>" : '<div class="empty">' + icon("heart") + "<p>还没有收藏任何漫展</p></div>");
}

function renderTrip() {
  if (!state.user) {
    $view.innerHTML =
      '<div class="empty" style="padding:70px 20px">' + icon("route") +
      "<p>登录后管理你的行程与出发前待办</p>" +
      '<button class="btn btn-primary" style="margin-top:8px" data-action="open-auth-login">' + icon("arrow") + "登录 / 注册</button></div>";
    return;
  }
  const todos = state.todos;
  const todoItems = todos
    .map(
      (t) =>
        '<div class="check-item' + (t.done ? " done" : "") + '" data-action="toggle-todo" data-id="' + t.id + '">' +
        '<span class="box">' + (t.done ? icon("check") : "") + "</span>" +
        '<span class="check-text">' + esc(t.text) + "</span>" +
        '<button class="todo-del" data-action="delete-todo" data-id="' + t.id + '">' + icon("x") + "</button>" +
        "</div>"
    )
    .join("");

  const joinedTeams = TEAMS.filter((t) => state.joined.has(t.id));
  let scheduleHtml = "";
  if (joinedTeams.length) {
    scheduleHtml = joinedTeams
      .map((t) => {
        const e = findExpo(t.expoId);
        const dateLabel = (e && e.start) || "";
        const venue = (e && e.venue) || "漫展场馆";
        const items = [
          ["出发当天 08:30", "车站 / 集合点集合", "与领队 " + t.leader + " 确认集合地点与时间", "done"],
          ["09:10", "前往" + venue, "按队伍约定方式前往（" + t.mode + "）", "done"],
          ["入场", "检票入场", "凭电子票二维码入场，先拍集体照", "current"],
          ["全天", "自由逛展 + 摊位巡游", "按兴趣分组行动，午间一起吃饭", ""],
          ["闭馆", "集合返程", venue + "门口集合，各自返程", ""],
        ]
          .map(
            (it) =>
              '<div class="timeline-item ' +
              it[3] +
              '">' +
              '<div class="time">' +
              esc(it[0]) +
              "</div>" +
              '<div class="title">' +
              esc(it[1]) +
              "</div>" +
              '<div class="desc">' +
              esc(it[2]) +
              "</div>" +
              "</div>"
          )
          .join("");
        return (
          '<div class="trip-team">' +
          '<div class="trip-team-head">' +
          teamIconHtml(t) +
          '<div class="grow"><div class="t">' +
          esc(t.name) +
          "</div>" +
          '<div class="s">' +
          esc((e && e.name) || "") +
          " · " +
          esc(dateLabel) +
          " · " +
          esc(venue) +
          "</div></div></div>" +
          '<div class="timeline">' +
          items +
          "</div></div>"
        );
      })
      .join("");
  } else {
    scheduleHtml =
      '<div class="empty">' +
      icon("route") +
      "<p>你还没有加入队伍，加入后这里会自动生成对应的行程。</p>" +
      '<button class="btn btn-primary" style="margin-top:8px" data-action="go-home">去漫展发现</button>' +
      "</div>";
  }

  $view.innerHTML =
    '<div class="trip-layout">' +
    '<div class="panel"><h4>行程安排</h4><div class="trip-schedule">' +
    scheduleHtml +
    "</div>" +
    "</div>" +
    '<div class="panel"><h4>出发前待办</h4><div class="checklist">' +
    (todoItems || '<div class="empty" style="padding:20px 8px"><p>还没有待办，添加一条吧</p></div>') +
    "</div>" +
    '<button class="btn btn-ghost" style="width:100%;margin-top:14px" data-action="add-todo">' + icon("plus") + "添加待办</button>" +
    "</div>" +
    "</div>";
}

function renderProfile() {
  if (!state.user) {
    $view.innerHTML =
      '<div class="empty" style="padding:70px 20px">' + icon("user") +
      "<p>登录后查看个人资料、等级和你的队伍</p>" +
      '<button class="btn btn-primary" style="margin-top:8px" data-action="open-auth-login">' + icon("arrow") + "登录 / 注册</button></div>";
    return;
  }
  const u = state.user;
  const inLevel = u.exp % 100;
  const levelName = { 1: "新手出发", 2: "入门同好", 3: "同行达人", 4: "漫展老手", 5: "资深领队" }[u.level] || "漫展伙伴";
  const joinedCount = state.joined.size;
  const appliedCount = state.applied.size;
  const todoCount = state.todos.filter((t) => !t.done).length;
  const statCards =
    '<div class="stat-row">' +
    '<button class="stat-card" data-action="profile-favs"><div class="num">' + state.favs.size + '</div><div class="lbl">收藏的漫展</div></button>' +
    '<button class="stat-card" data-action="profile-joined"><div class="num">' + joinedCount + '</div><div class="lbl">已加入队伍</div></button>' +
    '<button class="stat-card" data-action="profile-applied"><div class="num">' + appliedCount + '</div><div class="lbl">待确认申请</div></button>' +
    "</div>";

  $view.innerHTML =
    '<div class="profile-head">' +
    '<button class="avatar avatar-btn" style="background:' + (u.avatarUrl ? "none" : "linear-gradient(135deg,#0d9488,#2dd4bf)") + '" data-action="change-avatar">' +
    (u.avatarUrl ? '<img src="' + esc(u.avatarUrl) + '" alt="头像" />' : esc(u.nickname[0] || "友")) +
    "</button>" +
    "<div>" +
    "<h2>" + esc(u.nickname) + "</h2>" +
    '<div class="sub">@' + esc(u.username) + " · " + esc(u.city || "未设置城市") + "</div>" +
    "</div>" +
    '<div class="spacer" style="flex:1"></div>' +
    '<span class="level-badge">' + icon("star") + " Lv." + u.level + " · " + levelName + "</span>" +
    '<button class="btn btn-ghost" data-action="edit-profile">' + icon("settings") + "编辑资料</button>" +
    "</div>" +
    statCards +
    '<div class="panel" style="margin-bottom:18px"><h4>等级成长</h4>' +
    '<div class="level-row"><span>Lv.' + u.level + "</span>" +
    '<div class="progress level-progress"><span style="width:' + inLevel + '%"></span></div>' +
    "<span>Lv." + (u.level + 1) + "</span></div>" +
    '<p class="muted" style="margin:8px 0 0;font-size:12.5px">当前经验 ' + u.exp + "，再获得 " + (100 - inLevel) + " 经验升级。创建队伍 +30，加入队伍 +10。</p>" +
    "</div>" +
    '<div class="settings-list">' +
    '<div class="settings-item">' + icon("shield") + "隐私与联系方式保护<span class='pill-on'>已开启</span></div>" +
    '<button class="settings-item" data-action="toast">' + icon("flag") + "反馈与帮助<span class='chevron'>" + icon("right") + "</span></button>" +
    '<button class="settings-item" data-action="logout">' + icon("external") + "退出登录<span class='chevron'>" + icon("right") + "</span></button>" +
    "</div>";
}

/* ---------- Modal ---------- */
function openAuth(mode) {
  const isLogin = mode === "login";
  $modal.innerHTML =
    '<div class="modal">' +
    '<div class="modal-head"><h3>' + (isLogin ? "登录" : "注册") + "一起去</h3><button class=\"close\" data-action=\"close-modal\">" + icon("x") + "</button></div>" +
    '<form class="form-grid" id="auth-form">' +
    '<div class="field"><label>用户名</label><input name="username" placeholder="字母或数字" required autocomplete="username" /></div>' +
    '<div class="field"><label>密码</label><input name="password" type="password" placeholder="至少 6 位" required minlength="6" autocomplete="' + (isLogin ? "current-password" : "new-password") + '" /></div>' +
    (isLogin ? "" : '<div class="field"><label>昵称</label><input name="nickname" placeholder="展示给队友的名字" /></div>') +
    '<p class="form-hint">密码采用加盐哈希存储，服务器不保存明文。</p>' +
    '<div class="form-actions"><button type="button" class="btn btn-ghost" data-action="switch-auth">' + (isLogin ? "去注册" : "去登录") + "</button>" +
    '<button type="submit" class="btn btn-primary">' + (isLogin ? "登录" : "注册") + "</button></div>" +
    "</form></div>";
  $modal.hidden = false;
}

function openEditProfile() {
  const u = state.user;
  $modal.innerHTML =
    '<div class="modal">' +
    '<div class="modal-head"><h3>编辑资料</h3><button class="close" data-action="close-modal">' + icon("x") + "</button></div>" +
    '<form class="form-grid" id="profile-form">' +
    '<div class="field"><label>昵称</label><input name="nickname" value="' + esc(u.nickname) + '" required /></div>' +
    '<div class="field"><label>所在城市</label><input name="city" value="' + esc(u.city) + '" placeholder="例如：上海" /></div>' +
    '<div class="field" style="grid-column:1/-1"><label>个人简介</label><textarea name="bio" placeholder="介绍你的兴趣、常去的漫展">' + esc(u.bio) + "</textarea></div>" +
    '<div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">取消</button><button type="submit" class="btn btn-primary">保存</button></div>' +
    "</form></div>";
  $modal.hidden = false;
}

function openChangeAvatar() {
  $modal.innerHTML =
    '<div class="modal">' +
    '<div class="modal-head"><h3>更换头像</h3><button class="close" data-action="close-modal">' + icon("x") + "</button></div>" +
    '<div class="avatar-upload"><img id="avatar-preview" src="' + esc(state.user.avatarUrl) + '" alt="预览" /><input type="file" id="avatar-file" accept="image/*" /></div>' +
    '<div class="form-actions" style="margin-top:14px"><button type="button" class="btn btn-ghost" data-action="close-modal">取消</button><button class="btn btn-primary" id="avatar-save" disabled>保存头像</button></div>' +
    "</div>";
  $modal.hidden = false;
  let pendingUrl = "";
  document.getElementById("avatar-file").addEventListener("change", (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await api("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, dataUrl: reader.result, category: "avatars" }),
        });
        pendingUrl = res.url;
        document.getElementById("avatar-preview").src = res.url;
        document.getElementById("avatar-save").disabled = false;
      } catch (e) {
        toast("上传失败：" + e.message);
      }
    };
    reader.readAsDataURL(file);
  });
  document.getElementById("avatar-save").addEventListener("click", async () => {
    if (!pendingUrl) return;
    await api("/api/avatar-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarUrl: pendingUrl }),
    });
    closeModal();
    toast("头像已提交审核，通过后自动生效");
  });
}

function openAddTodo() {
  $modal.innerHTML =
    '<div class="modal">' +
    '<div class="modal-head"><h3>添加待办</h3><button class="close" data-action="close-modal">' + icon("x") + "</button></div>" +
    '<form class="form-grid" id="todo-form">' +
    '<div class="field"><label>待办内容</label><input name="text" placeholder="例如：取票、订车票" required /></div>' +
    '<div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">取消</button><button type="submit" class="btn btn-primary">添加</button></div>' +
    "</form></div>";
  $modal.hidden = false;
}

function openReport() {
  const reasons = ["违规头像", "不当内容", "虚假信息", "骚扰行为", "其他"];
  $modal.innerHTML =
    '<div class="modal">' +
    '<div class="modal-head"><h3>举报队伍</h3><button class="close" data-action="close-modal">' + icon("x") + "</button></div>" +
    '<form class="form-grid" id="report-form">' +
    '<div class="field" style="grid-column:1/-1"><label>举报原因</label><select name="reason">' +
    reasons.map((r) => '<option value="' + r + '">' + r + "</option>").join("") +
    "</select></div>" +
    '<div class="field" style="grid-column:1/-1"><label>补充说明</label><textarea name="detail" placeholder="请描述具体情况"></textarea></div>' +
    '<div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">取消</button><button type="submit" class="btn btn-primary">提交举报</button></div>' +
    "</form></div>";
  $modal.hidden = false;
}

function openTeamCreate() {
  const e = findExpo(state.expoId);
  const canCustom = state.user && state.user.level >= 3;
  const emojiGrid = TEAM_EMOJIS.map(
    (em) => '<button type="button" class="emoji-opt' + (em === TEAM_EMOJIS[0] ? " active" : "") + '" data-emoji="' + em + '">' + em + "</button>"
  ).join("");
  const uploadPart = canCustom
    ? '<div class="field" style="grid-column:1/-1"><label>自定义图标（Lv.3 及以上）</label>' +
      '<div class="icon-upload"><input type="file" id="team-icon-file" accept="image/*" /><img class="icon-preview" id="team-icon-preview" alt="预览" /></div>' +
      '<p class="form-hint">上传后会先进入人工审核，审核通过前先展示默认 emoji。</p></div>'
    : '<p class="form-hint" style="grid-column:1/-1;margin:0">达到 Lv.3 后可上传自定义队伍图标，当前仅支持 emoji。</p>';
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
    '<div class="field" style="grid-column:1/-1"><label>队伍图标</label><div class="emoji-grid">' + emojiGrid + "</div></div>" +
    uploadPart +
    '<div class="form-actions"><button type="button" class="btn btn-ghost" data-action="close-modal">取消</button><button type="submit" class="btn btn-primary">' + icon("check") + "创建队伍</button></div>" +
    "</form>" +
    "</div>";
  $modal.hidden = false;
  let chosenEmoji = TEAM_EMOJIS[0];
  let customIconUrl = "";
  $modal.querySelectorAll("[data-emoji]").forEach((btn) => {
    btn.addEventListener("click", () => {
      chosenEmoji = btn.dataset.emoji;
      customIconUrl = "";
      document.getElementById("team-icon-preview")?.classList.remove("show");
      $modal.querySelectorAll("[data-emoji]").forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  const fileInput = document.getElementById("team-icon-file");
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await api("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, dataUrl: reader.result, category: "team-icons" }),
          });
          customIconUrl = res.url;
          const img = document.getElementById("team-icon-preview");
          img.src = res.url;
          img.classList.add("show");
        } catch (err) {
          toast("上传失败：" + err.message);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  window.__teamIconChoice = () => (customIconUrl ? { icon: customIconUrl, iconKind: "image" } : { icon: chosenEmoji, iconKind: "emoji" });
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
  renderSidebarUser();
  renderTopbar();
  if (state.view !== "home") clearInterval(window.__bannerTimer);
  if (state.view === "home") renderHome();
  else if (state.view === "expo-detail") renderExpoDetail();
  else if (state.view === "team-detail") renderTeamDetail();
  else if (state.view === "my-teams") renderMyTeams();
  else if (state.view === "favorites") renderFavorites();
  else if (state.view === "trip") renderTrip();
  else if (state.view === "profile") renderProfile();
}

function renderSidebarUser() {
  if (!state.user) {
    $sidebarUser.innerHTML =
      '<button class="user-card" data-action="open-auth-login">' +
      '<span class="avatar avatar-grad">' + icon("user").replace('<svg', '<svg style="width:18px;height:18px"') + "</span>" +
      '<span class="user-meta"><span class="user-name">登录 / 注册</span><span class="user-tag">解锁收藏与组团</span></span>' +
      icon("right").replace("<svg", '<svg class="chevron"') +
      "</button>";
    return;
  }
  const u = state.user;
  $sidebarUser.innerHTML =
    '<button class="user-card" data-action="toggle-user-menu">' +
    '<span class="avatar avatar-grad" style="background:' + (u.avatarUrl ? "none" : "linear-gradient(135deg,#0d9488,#2dd4bf)") + '">' +
    (u.avatarUrl ? '<img src="' + esc(u.avatarUrl) + '" alt="头像" />' : esc(u.nickname[0] || "友")) +
    "</span>" +
    '<span class="user-meta"><span class="user-name">' + esc(u.nickname) + '</span><span class="user-tag">Lv.' + u.level + " · " + u.exp + " 经验</span></span>" +
    icon("right").replace("<svg", '<svg class="chevron"') +
    "</button>" +
    (state.userMenu
      ? '<div class="user-menu">' +
        '<button data-action="go-profile">' + icon("user") + "个人中心</button>" +
        '<button data-action="go-my-teams">' + icon("users") + "我的队伍</button>" +
        '<button data-action="logout">' + icon("external") + "退出登录</button>" +
        "</div>"
      : "");
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
    if (el.dataset.view === "my-teams") state.myTeamsFilter = "all";
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
    if (el.dataset.filter === "city") state.cityMenu = false;
    render();
    return;
  }
  if (el.hasAttribute("data-tab")) {
    state.expoTab = el.dataset.tab;
    render();
    return;
  }

  const action = el.dataset.action;
  if (action === "banner-prev") {
    state.bannerIndex = (state.bannerIndex - 1 + BANNERS.length) % BANNERS.length;
    renderHome();
    return;
  }
  if (action === "banner-next") {
    state.bannerIndex = (state.bannerIndex + 1) % BANNERS.length;
    renderHome();
    return;
  }
  if (action === "banner-goto") {
    state.bannerIndex = Number(el.dataset.index) || 0;
    renderHome();
    return;
  }
  if (action === "toggle-city-menu") {
    state.cityMenu = !state.cityMenu;
    renderHome();
    return;
  }
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
    if (!requireLogin()) return;
    const id = el.dataset.id;
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    saveState();
    render();
    return;
  }
  if (action === "toggle-fav") {
    if (!requireLogin()) return;
    const id = state.expoId;
    const on = !state.favs.has(id);
    on ? state.favs.add(id) : state.favs.delete(id);
    saveState();
    toast(on ? "已收藏" : "已取消收藏");
    renderTopbar();
    return;
  }
  if (action === "apply") {
    if (!requireLogin()) return;
    (async () => {
      try {
        await api("/api/teams/" + el.dataset.id + "/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        state.applied.add(el.dataset.id);
        toast("已提交申请，等待领队确认");
        render();
      } catch (e) {
        toast(e.message);
      }
    })();
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
  if (action === "report") {
    if (!requireLogin()) return;
    openReport();
    return;
  }
  if (action === "approve-request" || action === "reject-request") {
    (async () => {
      const status = action === "approve-request" ? "approved" : "rejected";
      try {
        await api("/api/teams/" + state.teamId + "/requests/" + el.dataset.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        toast(status === "approved" ? "已通过申请" : "已拒绝申请");
        const updated = await api("/api/teams/" + state.teamId);
        const idx = TEAMS.findIndex((x) => x.id === state.teamId);
        if (idx > -1) TEAMS[idx] = updated;
        else TEAMS.push(updated);
        renderTeamDetail();
        if (status === "approved") await refreshUserData();
      } catch (e) {
        toast(e.message);
      }
    })();
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
    if (!requireLogin()) return;
    openTeamCreate();
    return;
  }
  if (action === "open-auth-login") {
    openAuth("login");
    return;
  }
  if (action === "switch-auth") {
    const isLogin = document.querySelector("#auth-form [name=password]")?.autocomplete === "current-password";
    openAuth(isLogin ? "register" : "login");
    return;
  }
  if (action === "toggle-user-menu") {
    state.userMenu = !state.userMenu;
    renderSidebarUser();
    return;
  }
  if (action === "go-profile") {
    state.userMenu = false;
    go("profile");
    return;
  }
  if (action === "go-my-teams") {
    state.userMenu = false;
    state.myTeamsFilter = "all";
    go("my-teams");
    return;
  }
  if (action === "logout") {
    logout();
    return;
  }
  if (action === "edit-profile") {
    openEditProfile();
    return;
  }
  if (action === "change-avatar") {
    openChangeAvatar();
    return;
  }
  if (action === "my-favs") {
    go("favorites");
    return;
  }
  if (action === "profile-favs") {
    go("favorites");
    return;
  }
  if (action === "profile-joined") {
    state.myTeamsFilter = "joined";
    go("my-teams");
    return;
  }
  if (action === "profile-applied") {
    state.myTeamsFilter = "applied";
    go("my-teams");
    return;
  }
  if (action === "my-teams-filter") {
    state.myTeamsFilter = el.dataset.value;
    renderMyTeams();
    return;
  }
  if (action === "go-home") {
    go("home");
    return;
  }
  if (action === "add-todo") {
    openAddTodo();
    return;
  }
  if (action === "toggle-todo") {
    toggleTodo(el.dataset.id);
    return;
  }
  if (action === "delete-todo") {
    deleteTodo(el.dataset.id);
    return;
  }
  if (action === "reload") {
    init();
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
  const formId = ev.target.id;
  ev.preventDefault();

  if (formId === "team-form") {
    try {
      const fd = new FormData(ev.target);
      const e = findExpo(state.expoId);
      const payload = {
        expoId: e.id,
        name: fd.get("name").trim(),
        from: fd.get("from").trim(),
        mode: fd.get("mode"),
        size: 1,
        cap: Number(fd.get("cap")),
        tags: fd.get("tags").trim() ? fd.get("tags").split(/[,，、\s]+/).slice(0, 3) : ["新手友好"],
        color: COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)],
      };
      const iconChoice = window.__teamIconChoice ? window.__teamIconChoice() : { icon: "🎭", iconKind: "emoji" };
      payload.icon = iconChoice.icon;
      payload.iconKind = iconChoice.iconKind;
      const created = await api("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      TEAMS.push(created);
      state.joined.add(created.id);
      saveState();
      const me = await api("/api/auth/me");
      state.user = me.user;
      closeModal();
      toast("队伍创建成功，审核通过后公开展示");
      go("team-detail", { teamId: created.id });
    } catch (e) {
      toast(e.message);
    }
    return;
  }

  if (formId === "auth-form") {
    try {
      const fd = new FormData(ev.target);
      const isRegister = !!ev.target.querySelector('[name="nickname"]');
      const body = { username: fd.get("username").trim(), password: fd.get("password") };
      if (isRegister) body.nickname = fd.get("nickname").trim() || body.username;
      const res = await api(isRegister ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      state.user = res.user;
      closeModal();
      await refreshUserData();
      toast(isRegister ? "注册成功，欢迎加入" : "欢迎回来，" + res.user.nickname);
      render();
    } catch (e) {
      toast(e.message);
    }
    return;
  }

  if (formId === "profile-form") {
    try {
      const fd = new FormData(ev.target);
      const res = await api("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: fd.get("nickname").trim(),
          city: fd.get("city").trim(),
          bio: fd.get("bio").trim(),
        }),
      });
      state.user = res.user;
      closeModal();
      toast("资料已保存");
      render();
    } catch (e) {
      toast(e.message);
    }
    return;
  }

  if (formId === "todo-form") {
    try {
      const fd = new FormData(ev.target);
      const res = await api("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fd.get("text").trim() }),
      });
      state.todos = res;
      closeModal();
      toast("已添加待办");
      renderTrip();
    } catch (e) {
      toast(e.message);
    }
    return;
  }

  if (formId === "report-form") {
    try {
      const fd = new FormData(ev.target);
      await api("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: state.teamId,
          reason: fd.get("reason"),
          detail: fd.get("detail").trim(),
        }),
      });
      closeModal();
      toast("举报已提交，后台会尽快处理");
    } catch (e) {
      toast(e.message);
    }
    return;
  }
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
  if (!state.user) return;
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

async function logout() {
  await api("/api/auth/logout", { method: "POST" }).catch(() => {});
  state.user = null;
  state.favs = new Set();
  state.joined = new Set();
  state.applied = new Set();
  state.todos = [];
  state.userMenu = false;
  state.favOnly = false;
  go("home");
  toast("已退出登录");
}

async function toggleTodo(id) {
  const res = await api("/api/todos/" + id, { method: "PATCH" });
  state.todos = res;
  renderTrip();
}

async function deleteTodo(id) {
  const res = await api("/api/todos/" + id, { method: "DELETE" });
  state.todos = res;
  renderTrip();
}

async function refreshUserData() {
  if (!state.user) return;
  const [stateRes, todosRes, mineRes] = await Promise.all([
    api("/api/state"),
    api("/api/todos"),
    api("/api/teams?mine=1"),
  ]);
  state.favs = new Set(stateRes.favorites || []);
  state.joined = new Set(stateRes.joined || []);
  state.applied = new Set(stateRes.applied || []);
  state.todos = todosRes;
  mergeTeams(mineRes);
}

function mergeTeams(extra) {
  const map = new Map(TEAMS.map((t) => [t.id, t]));
  for (const t of extra || []) map.set(t.id, t);
  TEAMS = [...map.values()];
}

async function init() {
  try {
    const [exposRes, teamsRes, meRes] = await Promise.all([
      api("/api/expos"),
      api("/api/teams"),
      api("/api/auth/me"),
    ]);
    EXPOS = exposRes;
    TEAMS = teamsRes;
    state.user = meRes.user || null;
    CITIES = ["全部", ...new Set(EXPOS.map((e) => e.city))];
    if (state.user) {
      await refreshUserData();
    }
  } catch (e) {
    console.error("加载数据失败：", e);
    $view.innerHTML =
      '<div class="empty" style="padding:70px 20px">' + icon("x") +
      "<p>加载失败，请确认后端已启动（node server/server.js）</p>" +
      '<button class="btn btn-ghost" style="margin-top:8px" data-action="reload">重新加载</button></div>';
    renderNav();
    renderSidebarUser();
    return;
  }
  render();
}

init();
