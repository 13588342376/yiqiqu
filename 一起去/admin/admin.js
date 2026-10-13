const state = {
  tab: "expos",
  expos: [],
  teams: [],
  editing: null, // { type, id }
  filterExpo: "",
  filterQuery: "",
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
  const [expos, teams] = await Promise.all([api("/api/expos"), api("/api/teams")]);
  state.expos = expos;
  state.teams = teams;
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

function render() {
  $title.textContent = state.tab === "expos" ? "漫展管理" : "队伍管理";
  document.getElementById("add-btn").hidden = state.tab !== "expos";
  document.getElementById("filterbar").hidden = state.tab !== "teams";
  if (state.tab === "expos") renderExpos();
  else renderTeams();
}

function renderExpos() {
  $thead.innerHTML =
    "<tr><th>名称</th><th>城市</th><th>时间</th><th>场馆</th><th>规模</th><th>标签</th><th>队伍</th><th>操作</th></tr>";
  if (!state.expos.length) {
    $tbody.innerHTML = '<tr><td colspan="8" class="empty">还没有漫展数据，点右上角「新增」添加</td></tr>';
    return;
  }
  $tbody.innerHTML = state.expos
    .map(
      (e) =>
        "<tr>" +
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
    "<tr><th>名称</th><th>所属漫展</th><th>出发地</th><th>出行方式</th><th>人数</th><th>标签</th><th>操作</th></tr>";
  let list = state.teams;
  if (state.filterExpo) list = list.filter((t) => t.expoId === state.filterExpo);
  if (state.filterQuery) {
    const q = state.filterQuery.toLowerCase();
    list = list.filter((t) => (t.name + t.leader + t.from + expoName(t.expoId)).toLowerCase().includes(q));
  }
  if (!list.length) {
    $tbody.innerHTML = '<tr><td colspan="7" class="empty">没有符合条件的队伍</td></tr>';
    return;
  }
  $tbody.innerHTML = list
    .map(
      (t) =>
        "<tr>" +
        "<td><b>" + esc(t.name) + "</b></td>" +
        "<td>" + esc(expoName(t.expoId)) + "</td>" +
        "<td>" + esc(t.from) + "</td>" +
        "<td>" + esc(t.mode) + "</td>" +
        "<td>" + t.size + " / " + t.cap + "</td>" +
        "<td>" + (t.tags || []).map((x) => '<span class="tag">' + esc(x) + "</span>").join("") + "</td>" +
        '<td><button class="btn small danger" data-del="teams" data-id="' + t.id + '">删除</button></td>' +
        "</tr>"
    )
    .join("");
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
          body: JSON.stringify({ filename: file.name, dataUrl: reader.result }),
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

$tbody.addEventListener("click", (ev) => {
  const editBtn = ev.target.closest("[data-edit]");
  const delBtn = ev.target.closest("[data-del]");
  if (editBtn) openForm(editBtn.dataset.edit, editBtn.dataset.id);
  if (delBtn) del(delBtn.dataset.del, delBtn.dataset.id);
});

$form.addEventListener("submit", submitForm);
$form.addEventListener("click", (ev) => {
  if (ev.target.closest("#cancel")) closeForm();
});

$modal.addEventListener("click", (ev) => {
  if (ev.target === $modal) closeForm();
});

load();
