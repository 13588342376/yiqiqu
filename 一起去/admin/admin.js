const state = {
  tab: "expos",
  expos: [],
  teams: [],
  reports: [],
  avatarRequests: [],
  editing: null,
  filterExpo: "",
  filterQuery: "",
  reviewStatus: "pending",
  reviewType: "teams",
};

const $tabs = document.querySelectorAll(".tab");
const $title = document.getElementById("page-title");
const $thead = document.querySelector("#table thead");
const $tbody = document.querySelector("#table tbody");
const $modal = document.getElementById("modal");
const $modalTitle = document.getElementById("modal-title");
const $form = document.getElementById("form");
const $toast = document.getElementById("toast");

let toastTimer;
function toast(msg) {
  $toast.textContent = msg;
  $toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($toast.hidden = true), 2000);
}

async function api(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "请求失败");
  return data;
}

async function load() {
  const [expos, teams, reports, avatarRequests] = await Promise.all([
    api("/api/expos"),
    api("/api/teams?all=1"),
    api("/api/reports"),
    api("/api/avatar-requests"),
  ]);
  state.expos = expos;
  state.teams = teams;
  state.reports = reports;
  state.avatarRequests = avatarRequests;
  populateFilter();
  render();
}

function expoName(id) {
  const e = state.expos.find((x) => x.id === id);
  return e ? e.name : "（未知漫展）";
}

function teamCount(expoId) {
  return state.teams.filter((t) => t.expoId === expoId).length;
}

function iconCell(team) {
  if (team.iconKind === "image" && team.icon) {
    return '<span class="team-icon"><img src="' + esc(team.icon) + '" alt="图标" /></span>';
  }
  return '<span class="team-icon emoji">' + esc(team.icon || team.leader[0]) + "</span>";
}

function statusPill(status) {
  const map = {
    pending: '<span class="pill pending">待审核</span>',
    approved: '<span class="pill approved">已通过</span>',
    rejected: '<span class="pill rejected">已驳回</span>',
  };
  return map[status] || '<span class="pill">' + esc(status) + "</span>";
}

function render() {
  const titles = {
    expos: "漫展管理",
    teams: "队伍管理",
    review: "审核中心",
    reports: "举报处理",
  };
  $title.textContent = titles[state.tab] || "管理后台";
  document.getElementById("add-btn").hidden = state.tab !== "expos";
  document.getElementById("filterbar").hidden = state.tab !== "teams";
  document.getElementById("reviewbar").hidden = state.tab !== "review";
  if (state.tab === "expos") renderExpos();
  else if (state.tab === "teams") renderTeams();
  else if (state.tab === "review") renderReview();
  else renderReports();
}

function renderExpos() {
  $thead.innerHTML =
    "<tr><th>封面</th><th>名称</th><th>城市</th><th>时间</th><th>场馆</th><th>规模</th><th>标签</th><th>队伍</th><th>操作</th></tr>";
  if (!state.expos.length) {
    $tbody.innerHTML = '<tr><td colspan="9" class="empty">还没有漫展数据，点右上角「新增」添加</td></tr>';
    return;
  }
  $tbody.innerHTML = state.expos
    .map(
      (e) =>
        "<tr>" +
        '<td><span class="cover-thumb' + (e.coverImage ? " has-img" : "") + '" style="' + (e.coverImage ? "background-image:url('" + esc(e.coverImage) + "')" : "background:" + e.cover) + '"></span></td>' +
        "<td><b>" + esc(e.name) + "</b></td>" +
        "<td>" + esc(e.city) + "</td>" +
        "<td>" + esc(e.start) + "<br><span class='muted'>" + esc(e.end) + "</span></td>" +
        "<td>" + esc(e.venue) + "</td>" +
        "<td>" + esc(e.scale) + "</td>" +
        "<td>" + (e.tags || []).map((t) => '<span class="tag">' + esc(t) + "</span>").join("") + "</td>" +
        "<td>" + teamCount(e.id) + " 支</td>" +
        '<td><button class="btn small" data-edit="expos" data-id="' + e.id + '">编辑</button> ' +
        '<button class="btn small danger" data-del="expos" data-id="' + e.id + '">删除</button></td>' +
        "</tr>"
    )
    .join("");
}

function renderTeams() {
  $thead.innerHTML =
    "<tr><th>图标</th><th>名称</th><th>所属漫展</th><th>领队</th><th>出发地</th><th>出行方式</th><th>人数</th><th>状态</th><th>操作</th></tr>";
  let list = state.teams;
  if (state.filterExpo) list = list.filter((t) => t.expoId === state.filterExpo);
  if (state.filterQuery) {
    const q = state.filterQuery.toLowerCase();
    list = list.filter((t) => (t.name + t.leader + t.from + expoName(t.expoId)).toLowerCase().includes(q));
  }
  if (!list.length) {
    $tbody.innerHTML = '<tr><td colspan="9" class="empty">没有符合条件的队伍</td></tr>';
    return;
  }
  $tbody.innerHTML = list
    .map(
      (t) =>
        "<tr>" +
        "<td>" + iconCell(t) + "</td>" +
        "<td><b>" + esc(t.name) + "</b></td>" +
        "<td>" + esc(expoName(t.expoId)) + "</td>" +
        "<td>" + esc(t.leader) + '<br><span class="muted">' + esc(t.leaderUserId || "种子数据") + "</span></td>" +
        "<td>" + esc(t.from) + "</td>" +
        "<td>" + esc(t.mode) + "</td>" +
        "<td>" + t.size + " / " + t.cap + "</td>" +
        "<td>" + statusPill(t.status) + "</td>" +
        '<td><button class="btn small danger" data-del="teams" data-id="' + t.id + '">删除</button></td>' +
        "</tr>"
    )
    .join("");
}

function reviewTabs() {
  const types = [
    ["teams", "队伍审核"],
    ["avatars", "头像审核"],
  ];
  const items = [
    ["pending", "待审核"],
    ["approved", "已通过"],
    ["rejected", "已驳回"],
  ];
  return (
    '<div class="review-tabs">' +
    types
      .map(
        (tp) =>
          '<button class="review-tab' +
          (state.reviewType === tp[0] ? " active" : "") +
          '" data-review-type="' +
          tp[0] +
          '">' +
          tp[1] +
          "</button>"
      )
      .join("") +
    '<span class="review-sep"></span>' +
    items
      .map(
        (it) =>
          '<button class="review-tab' +
          (state.reviewStatus === it[0] ? " active" : "") +
          '" data-review-status="' +
          it[0] +
          '">' +
          it[1] +
          "</button>"
      )
      .join("") +
    "</div>"
  );
}

function renderReview() {
  document.getElementById("reviewbar").innerHTML = reviewTabs();
  if (state.reviewType === "avatars") return renderAvatarReview();
  const list = state.teams.filter((t) => t.status === state.reviewStatus);
  $thead.innerHTML =
    "<tr><th>图标</th><th>队伍内容</th><th>领队 / 用户ID</th><th>所属漫展</th><th>状态</th><th>操作</th></tr>";
  if (!list.length) {
    $tbody.innerHTML = '<tr><td colspan="6" class="empty">该分区暂无记录</td></tr>';
    return;
  }
  $tbody.innerHTML = list
    .map(
      (t) =>
        "<tr>" +
        "<td>" + iconCell(t) + "</td>" +
        "<td><b>" + esc(t.name) + "</b><br><span class='muted'>" + esc(t.from) + " · " + esc((t.tags || []).join(" / ")) + "</span></td>" +
        "<td>" + esc(t.leader) + '<br><span class="muted">' + esc(t.leaderUserId || "种子数据") + "</span></td>" +
        "<td>" + esc(expoName(t.expoId)) + "</td>" +
        "<td>" + statusPill(t.status) + "</td>" +
        "<td>" +
        (t.status === "pending"
          ? '<button class="btn small success" data-team-status="' + t.id + '" data-status="approved">通过</button> ' +
            '<button class="btn small danger" data-team-status="' + t.id + '" data-status="rejected">驳回</button>'
          : '<button class="btn small" data-team-status="' + t.id + '" data-status="pending">退回待审</button>') +
        "</td>" +
        "</tr>"
    )
    .join("");
}

function renderAvatarReview() {
  const list = state.avatarRequests.filter((r) => r.status === state.reviewStatus);
  $thead.innerHTML =
    "<tr><th>头像</th><th>用户</th><th>用户ID</th><th>状态</th><th>操作</th></tr>";
  if (!list.length) {
    $tbody.innerHTML = '<tr><td colspan="5" class="empty">该分区暂无记录</td></tr>';
    return;
  }
  $tbody.innerHTML = list
    .map(
      (r) =>
        "<tr>" +
        '<td><span class="avatar-thumb"><img src="' + esc(r.avatarUrl) + '" alt="头像" /></span></td>' +
        "<td><b>" + esc(r.user.nickname) + "</b></td>" +
        '<td><span class="muted">' + esc(r.userId) + "</span></td>" +
        "<td>" + statusPill(r.status) + "</td>" +
        "<td>" +
        (r.status === "pending"
          ? '<button class="btn small success" data-avatar-status="' + r.id + '" data-status="approved">通过</button> ' +
            '<button class="btn small danger" data-avatar-status="' + r.id + '" data-status="rejected">驳回</button>'
          : '<button class="btn small" data-avatar-status="' + r.id + '" data-status="pending">退回待审</button>') +
        "</td>" +
        "</tr>"
    )
    .join("");
}

function renderReports() {
  $thead.innerHTML =
    "<tr><th>举报队伍</th><th>图标</th><th>原因</th><th>说明</th><th>举报人</th><th>状态</th><th>操作</th></tr>";
  if (!state.reports.length) {
    $tbody.innerHTML = '<tr><td colspan="7" class="empty">暂无举报记录</td></tr>';
    return;
  }
  $tbody.innerHTML = state.reports
    .map((r) => {
      const team = state.teams.find((t) => t.id === r.teamId);
      const icon = team ? iconCell(team) : '<span class="muted">-</span>';
      return (
        "<tr>" +
        "<td><b>" + esc(r.teamName) + "</b></td>" +
        "<td>" + icon + "</td>" +
        "<td>" + esc(r.reason || "-") + "</td>" +
        "<td>" + esc(r.detail || "-") + "</td>" +
        "<td>" + esc(r.reporter.nickname) + '<br><span class="muted">' + esc(r.reporter.username) + "</span></td>" +
        "<td>" + reportPill(r.status) + "</td>" +
        '<td><button class="btn small success" data-report="' + r.id + '" data-report-status="handled">标记已处理</button> ' +
        '<button class="btn small" data-report="' + r.id + '" data-report-status="dismissed">忽略</button></td>' +
        "</tr>"
      );
    })
    .join("");
}

function reportPill(status) {
  const map = {
    pending: '<span class="pill pending">待处理</span>',
    handled: '<span class="pill approved">已处理</span>',
    dismissed: '<span class="pill rejected">已忽略</span>',
  };
  return map[status] || '<span class="pill">' + esc(status) + "</span>";
}

function expoForm(expo) {
  const e = expo || {};
  return (
    '<div class="form-grid">' +
    field("full", "名称", '<input name="name" required value="' + esc(e.name || "") + '" />') +
    field("", "简称", '<input name="glyph" value="' + esc(e.glyph || "") + '" />') +
    field("", "城市", '<input name="city" value="' + esc(e.city || "") + '" />') +
    field("", "开始日期", '<input type="date" name="start" value="' + esc(e.start || "") + '" />') +
    field("", "结束日期", '<input type="date" name="end" value="' + esc(e.end || "") + '" />') +
    field("full", "场馆", '<input name="venue" value="' + esc(e.venue || "") + '" />') +
    field("", "规模", '<input name="scale" placeholder="例如：5万+ 人次" value="' + esc(e.scale || "") + '" />') +
    field("", "标签", '<input name="tags" placeholder="综合,同人" value="' + esc((e.tags || []).join(",")) + '" />') +
    field("full", "封面图", '<div class="cover-upload"><input type="file" id="cover-file" accept="image/*" /><img class="cover-preview' + (e.coverImage ? " show" : "") + '" id="cover-preview" src="' + esc(e.coverImage || "") + '" alt="封面预览" /><input type="hidden" name="coverImage" value="' + esc(e.coverImage || "") + '" /></div>') +
    field("full", "兜底渐变（无图时显示）", '<input name="cover" placeholder="linear-gradient(...)" value="' + esc(e.cover || "") + '" />') +
    field("full", "购票链接", '<input name="ticketUrl" value="' + esc(e.ticketUrl || "") + '" />') +
    field("full", "简介", '<textarea name="desc">' + esc(e.desc || "") + "</textarea>") +
    actions() +
    "</div>"
  );
}

function teamForm(team) {
  const t = team || {};
  const options = state.expos
    .map((e) => '<option value="' + e.id + '"' + (t.expoId === e.id ? " selected" : "") + ">" + esc(e.name) + "</option>")
    .join("");
  const modes = ["高铁", "自驾", "地铁", "公交", "拼车"];
  const modeOptions = modes
    .map((m) => '<option value="' + m + '"' + (t.mode === m ? " selected" : "") + ">" + m + "</option>")
    .join("");
  return (
    '<div class="form-grid">' +
    field("full", "队伍名称", '<input name="name" required value="' + esc(t.name || "") + '" />') +
    field("", "所属漫展", '<select name="expoId">' + options + "</select>") +
    field("", "领队", '<input name="leader" value="' + esc(t.leader || "") + '" />') +
    field("", "出发地", '<input name="from" value="' + esc(t.from || "") + '" />') +
    field("", "出行方式", '<select name="mode">' + modeOptions + "</select>") +
    field("", "现有人数", '<input type="number" name="size" min="1" value="' + (t.size || 1) + '" />') +
    field("", "目标人数", '<input type="number" name="cap" min="1" value="' + (t.cap || 5) + '" />') +
    field("full", "标签", '<input name="tags" placeholder="摄影,拼车" value="' + esc((t.tags || []).join(",")) + '" />') +
    field("full", "颜色渐变", '<input name="color" value="' + esc(t.color || "") + '" />') +
    actions() +
    "</div>"
  );
}

function field(cls, label, inputHtml) {
  return '<div class="field' + (cls ? " " + cls : "") + '"><label>' + label + "</label>" + inputHtml + "</div>";
}

function actions() {
  return (
    '<div class="form-actions"><button type="button" class="btn" id="cancel">取消</button>' +
    '<button type="submit" class="btn primary">保存</button></div>'
  );
}

function populateFilter() {
  const sel = document.getElementById("filter-expo");
  sel.innerHTML =
    '<option value="">全部漫展</option>' +
    state.expos.map((e) => '<option value="' + e.id + '">' + esc(e.name) + "</option>").join("");
  sel.value = state.filterExpo || "";
}

function setupCoverUpload() {
  const fileInput = document.getElementById("cover-file");
  if (!fileInput) return;
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await api("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, dataUrl: reader.result, category: "covers" }),
        });
        document.querySelector('input[name="coverImage"]').value = res.url;
        const img = document.getElementById("cover-preview");
        img.src = res.url;
        img.classList.add("show");
        toast("封面上传成功");
      } catch (err) {
        toast("上传失败：" + err.message);
      }
    };
    reader.readAsDataURL(file);
  });
}

function openForm(type, id) {
  state.editing = { type, id };
  const isExpo = type === "expos";
  const record = id ? (isExpo ? state.expos.find((x) => x.id === id) : state.teams.find((x) => x.id === id)) : null;
  $modalTitle.textContent = (id ? "编辑" : "新增") + (isExpo ? "漫展" : "队伍");
  $form.innerHTML = isExpo ? expoForm(record) : teamForm(record);
  if (isExpo) setupCoverUpload();
  $modal.hidden = false;
}

function closeForm() {
  $modal.hidden = true;
  state.editing = null;
}

function parseTags(str) {
  return String(str || "")
    .split(/[,，、\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function submitForm(ev) {
  ev.preventDefault();
  const fd = new FormData(ev.target);
  const type = state.editing.type;
  const id = state.editing.id;
  const payload = Object.fromEntries(fd.entries());
  payload.tags = parseTags(payload.tags);
  if (type === "teams") {
    payload.size = Number(payload.size) || 1;
    payload.cap = Number(payload.cap) || 5;
  }

  try {
    const url = id ? "/api/" + type + "/" + id : "/api/" + type;
    await api(url, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    toast(id ? "已更新" : "已新增");
    closeForm();
    await load();
  } catch (e) {
    toast("保存失败：" + e.message);
  }
}

async function del(type, id) {
  if (!confirm("确定删除这条记录吗？该操作不可撤销。")) return;
  try {
    await api("/api/" + type + "/" + id, { method: "DELETE" });
    toast("已删除");
    await load();
  } catch (e) {
    toast("删除失败：" + e.message);
  }
}

async function setTeamStatus(id, status) {
  try {
    await api("/api/teams/" + id + "/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    toast("状态已更新");
    await load();
  } catch (e) {
    toast("操作失败：" + e.message);
  }
}

async function setReportStatus(id, status) {
  try {
    await api("/api/reports/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    toast("已更新举报状态");
    await load();
  } catch (e) {
    toast("操作失败：" + e.message);
  }
}

async function setAvatarStatus(id, status) {
  try {
    await api("/api/avatar-requests/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    toast("头像审核已更新");
    await load();
  } catch (e) {
    toast("操作失败：" + e.message);
  }
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

$tabs.forEach((t) =>
  t.addEventListener("click", () => {
    $tabs.forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    state.tab = t.dataset.tab;
    render();
  })
);

document.getElementById("add-btn").addEventListener("click", () => openForm(state.tab, null));
document.getElementById("modal-close").addEventListener("click", closeForm);
document.getElementById("filter-expo").addEventListener("change", (ev) => {
  state.filterExpo = ev.target.value;
  renderTeams();
});
document.getElementById("filter-search").addEventListener("input", (ev) => {
  state.filterQuery = ev.target.value;
  renderTeams();
});

document.getElementById("reviewbar").addEventListener("click", (ev) => {
  const btn = ev.target.closest("[data-review-status]");
  const typeBtn = ev.target.closest("[data-review-type]");
  if (typeBtn) {
    state.reviewType = typeBtn.dataset.reviewType;
    renderReview();
    return;
  }
  if (!btn) return;
  state.reviewStatus = btn.dataset.reviewStatus;
  renderReview();
});

$tbody.addEventListener("click", (ev) => {
  const editBtn = ev.target.closest("[data-edit]");
  const delBtn = ev.target.closest("[data-del]");
  const teamStatusBtn = ev.target.closest("[data-team-status]");
  const reportBtn = ev.target.closest("[data-report]");
  const avatarStatusBtn = ev.target.closest("[data-avatar-status]");
  if (editBtn) openForm(editBtn.dataset.edit, editBtn.dataset.id);
  if (delBtn) del(delBtn.dataset.del, delBtn.dataset.id);
  if (teamStatusBtn) setTeamStatus(teamStatusBtn.dataset.teamStatus, teamStatusBtn.dataset.status);
  if (reportBtn) setReportStatus(reportBtn.dataset.report, reportBtn.dataset.reportStatus);
  if (avatarStatusBtn) setAvatarStatus(avatarStatusBtn.dataset.avatarStatus, avatarStatusBtn.dataset.status);
});

$form.addEventListener("submit", submitForm);
$form.addEventListener("click", (ev) => {
  if (ev.target.closest("#cancel")) closeForm();
});

$modal.addEventListener("click", (ev) => {
  if (ev.target === $modal) closeForm();
});

load();
