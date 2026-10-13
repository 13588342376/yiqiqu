// 种子数据：人工整理的真实漫展品牌。
// 注意：日期、场馆、购票链接均为“演示数据、待核实”，上线前请从官方渠道逐一替换。
const db = require("./db");

const EXPOS = [
  { id: "cp-sh", name: "CP同人展 · 上海", glyph: "CP", city: "上海", venue: "国家会展中心", start_date: "2026-10-24", end_date: "2026-10-25", scale: "10万+ 人次", desc: "国内规模最大的综合同人创作展，聚集大量同人社团与创作者，摊位、舞台、签售一应俱全。", cover: "linear-gradient(120deg,#ff5f7a 0%,#f43f5e 42%,#ff8a5c 100%)", tags: ["综合", "超大型"], ticket_url: "" },
  { id: "gz-yhc", name: "广州萤火虫动漫游戏嘉年华", glyph: "萤", city: "广州", venue: "保利世贸博览馆", start_date: "2026-11-07", end_date: "2026-11-08", scale: "5万+ 人次", desc: "华南人气动漫游戏综合展，游戏厂商与国漫 IP 齐聚，现场互动与展销体验丰富。", cover: "linear-gradient(120deg,#0ea5e9 0%,#2563eb 55%,#6366f1 100%)", tags: ["游戏", "展销"], ticket_url: "" },
  { id: "sz-game", name: "深圳国际电玩节", glyph: "深", city: "深圳", venue: "深圳会展中心", start_date: "2026-12-19", end_date: "2026-12-20", scale: "3万+ 人次", desc: "聚焦游戏与电竞赛事的展会，现场试玩、电竞赛事与新作发布集中呈现。", cover: "linear-gradient(120deg,#7c3aed 0%,#a855f7 55%,#ec4899 100%)", tags: ["游戏", "电玩"], ticket_url: "" },
  { id: "sh-bw", name: "BilibiliWorld 上海", glyph: "BW", city: "上海", venue: "国家会展中心", start_date: "2027-01-01", end_date: "2027-01-03", scale: "8万+ 人次", desc: "B站旗下大型线下嘉年华，游戏试玩、UP主见面会、舞台演出与周边展销集中呈现。", cover: "linear-gradient(120deg,#0ea5e9 0%,#2563eb 55%,#6366f1 100%)", tags: ["游戏", "舞台"], ticket_url: "" },
  { id: "bj-ido", name: "北京 IDO 动漫游戏嘉年华", glyph: "京", city: "北京", venue: "北京国家会议中心", start_date: "2027-01-16", end_date: "2027-01-17", scale: "4万+ 人次", desc: "北方地区代表性的动漫游戏展会，舞台演出与嘉宾签售是最大亮点。", cover: "linear-gradient(120deg,#f59e0b 0%,#f97316 55%,#ef4444 100%)", tags: ["综合", "舞台"], ticket_url: "" },
  { id: "cd-comiday", name: "ComiDay 成都同人祭", glyph: "蓉", city: "成都", venue: "成都世纪城新会展中心", start_date: "2027-02-06", end_date: "2027-02-07", scale: "3万+ 人次", desc: "西南老牌同人创作展，以同人摊位与创作者交流为核心氛围。", cover: "linear-gradient(120deg,#0d9488 0%,#14b8a6 55%,#22c55e 100%)", tags: ["同人", "创作"], ticket_url: "" },
  { id: "wh-enie", name: "武汉艾妮动漫游戏展", glyph: "汉", city: "武汉", venue: "武汉国际博览中心", start_date: "2027-04-10", end_date: "2027-04-11", scale: "2万+ 人次", desc: "华中地区人气动漫游戏展，国漫展销与舞台互动是主要看点。", cover: "linear-gradient(120deg,#f59e0b 0%,#f97316 55%,#22c55e 100%)", tags: ["综合", "国漫"], ticket_url: "" },
  { id: "hz-cicaf", name: "CICAF 中国国际动漫节", glyph: "杭", city: "杭州", venue: "白马湖国际会展中心", start_date: "2027-05-01", end_date: "2027-05-03", scale: "6万+ 人次", desc: "中国国际动漫节主展，国漫 IP 与动画展映内容丰富，是年度最受关注的动漫展会之一。", cover: "linear-gradient(120deg,#e11d48 0%,#f43f5e 50%,#fb7185 100%)", tags: ["综合", "国漫"], ticket_url: "" },
  { id: "nj-cicf", name: "南京 CICF 动漫游戏展", glyph: "宁", city: "南京", venue: "南京国际博览中心", start_date: "2027-06-12", end_date: "2027-06-13", scale: "2万+ 人次", desc: "江苏地区代表性的动漫游戏嘉年华，展销、舞台与同人创作并重。", cover: "linear-gradient(120deg,#0d9488 0%,#14b8a6 55%,#0ea5e9 100%)", tags: ["游戏", "同人"], ticket_url: "" },
  { id: "cq-west", name: "重庆西部动漫节", glyph: "渝", city: "重庆", venue: "重庆国际博览中心", start_date: "2027-07-17", end_date: "2027-07-18", scale: "3万+ 人次", desc: "西部地区的年度动漫盛会，融合国漫、游戏与舞台演出。", cover: "linear-gradient(120deg,#e11d48 0%,#f43f5e 50%,#f59e0b 100%)", tags: ["综合", "舞台"], ticket_url: "" },
];

const TEAMS = [
  { id: "t1", expo_id: "cp-sh", name: "上海虹桥出发 · CP找摄影搭子", leader: "阿茗", from_city: "上海·虹桥", mode: "高铁", size: 3, cap: 5, tags: ["摄影", "同好", "有装备"], color: "linear-gradient(135deg,#f43f5e,#ff8a5c)" },
  { id: "t2", expo_id: "cp-sh", name: "杭州出发 · 当天往返拼车", leader: "小K", from_city: "杭州·西湖", mode: "自驾", size: 4, cap: 4, tags: ["拼车", "当天往返"], color: "linear-gradient(135deg,#0ea5e9,#6366f1)" },
  { id: "t3", expo_id: "cp-sh", name: "上海本地 · 周末漫展一起逛", leader: "Momo", from_city: "上海·浦东", mode: "地铁", size: 2, cap: 6, tags: ["本地", "新手友好"], color: "linear-gradient(135deg,#0d9488,#22c55e)" },
  { id: "t4", expo_id: "gz-yhc", name: "广州出发 · 萤火虫组队", leader: "橙子", from_city: "广州·天河", mode: "地铁", size: 3, cap: 5, tags: ["游戏", "展销"], color: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { id: "t9", expo_id: "gz-yhc", name: "深圳出发 · 萤火虫当天往返", leader: "洛洛", from_city: "深圳·南山", mode: "高铁", size: 2, cap: 4, tags: ["高铁", "当天往返"], color: "linear-gradient(135deg,#0ea5e9,#22c55e)" },
  { id: "t5", expo_id: "sh-bw", name: "上海出发 · BW舞台专场一起冲", leader: "北北", from_city: "上海·浦东", mode: "地铁", size: 2, cap: 4, tags: ["舞台", "UP主"], color: "linear-gradient(135deg,#7c3aed,#ec4899)" },
  { id: "t10", expo_id: "sh-bw", name: "苏州出发 · BW拼房拼车", leader: "小满", from_city: "苏州·园区", mode: "高铁", size: 3, cap: 5, tags: ["拼房", "拼车"], color: "linear-gradient(135deg,#0ea5e9,#6366f1)" },
  { id: "t11", expo_id: "bj-ido", name: "北京出发 · IDO舞台追番", leader: "清禾", from_city: "北京·朝阳", mode: "地铁", size: 2, cap: 4, tags: ["舞台", "嘉宾签售"], color: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { id: "t12", expo_id: "bj-ido", name: "天津出发 · IDO高铁往返", leader: "十七", from_city: "天津·和平", mode: "高铁", size: 3, cap: 5, tags: ["高铁", "当天往返"], color: "linear-gradient(135deg,#7c3aed,#ec4899)" },
  { id: "t6", expo_id: "cd-comiday", name: "成都出发 · ComiDay同人摊", leader: "阿泽", from_city: "成都·锦江", mode: "公交", size: 5, cap: 5, tags: ["同人", "摊主"], color: "linear-gradient(135deg,#0d9488,#14b8a6)" },
  { id: "t13", expo_id: "cd-comiday", name: "重庆出发 · ComiDay拼车", leader: "小知", from_city: "重庆·渝北", mode: "自驾", size: 2, cap: 4, tags: ["拼车", "同人"], color: "linear-gradient(135deg,#f43f5e,#f59e0b)" },
  { id: "t14", expo_id: "wh-enie", name: "武汉出发 · 艾妮本地组队", leader: "阿川", from_city: "武汉·武昌", mode: "地铁", size: 2, cap: 5, tags: ["本地", "国漫"], color: "linear-gradient(135deg,#f59e0b,#22c55e)" },
  { id: "t15", expo_id: "wh-enie", name: "长沙出发 · 艾妮高铁往返", leader: "南音", from_city: "长沙·岳麓", mode: "高铁", size: 3, cap: 4, tags: ["高铁", "展销"], color: "linear-gradient(135deg,#0ea5e9,#14b8a6)" },
  { id: "t7", expo_id: "hz-cicaf", name: "杭州出发 · CICAF三天全程", leader: "汐", from_city: "杭州·滨江", mode: "高铁", size: 3, cap: 6, tags: ["国漫", "全程同行"], color: "linear-gradient(135deg,#e11d48,#fb7185)" },
  { id: "t8", expo_id: "hz-cicaf", name: "上海出发 · 杭州住一晚", leader: "栗子", from_city: "上海·静安", mode: "高铁", size: 2, cap: 4, tags: ["拼房", "住宿"], color: "linear-gradient(135deg,#f43f5e,#f59e0b)" },
  { id: "t16", expo_id: "nj-cicf", name: "南京出发 · CICF本地漫展", leader: "青柠", from_city: "南京·鼓楼", mode: "地铁", size: 2, cap: 5, tags: ["本地", "同人"], color: "linear-gradient(135deg,#0d9488,#0ea5e9)" },
  { id: "t17", expo_id: "nj-cicf", name: "合肥出发 · CICF拼车", leader: "禾风", from_city: "合肥·蜀山", mode: "自驾", size: 4, cap: 4, tags: ["拼车", "游戏"], color: "linear-gradient(135deg,#f43f5e,#7c3aed)" },
  { id: "t18", expo_id: "cq-west", name: "重庆出发 · 西部动漫节组队", leader: "山城", from_city: "重庆·江北", mode: "地铁", size: 3, cap: 5, tags: ["舞台", "综合"], color: "linear-gradient(135deg,#e11d48,#f59e0b)" },
  { id: "t19", expo_id: "cq-west", name: "成都出发 · 西部动漫节高铁", leader: "小野", from_city: "成都·武侯", mode: "高铁", size: 2, cap: 4, tags: ["高铁", "国漫"], color: "linear-gradient(135deg,#0d9488,#f59e0b)" },
  { id: "t20", expo_id: "sz-game", name: "深圳出发 · 电玩节试玩队", leader: "小宇", from_city: "深圳·福田", mode: "地铁", size: 3, cap: 5, tags: ["游戏", "电竞赛事"], color: "linear-gradient(135deg,#7c3aed,#0ea5e9)" },
];

function insertAll(dbInstance) {
  dbInstance.exec("DELETE FROM team_requests;");
  dbInstance.exec("DELETE FROM reports;");
  dbInstance.exec("DELETE FROM teams;");
  dbInstance.exec("DELETE FROM expos;");

  const insertExpo = dbInstance.prepare(
    `INSERT INTO expos (id, name, glyph, city, venue, start_date, end_date, scale, desc, cover, cover_image, tags, ticket_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', ?, ?)`
  );
  for (const e of EXPOS) {
    insertExpo.run(e.id, e.name, e.glyph, e.city, e.venue, e.start_date, e.end_date, e.scale, e.desc, e.cover, JSON.stringify(e.tags), e.ticket_url);
  }

  const insertTeam = dbInstance.prepare(
    `INSERT INTO teams (id, expo_id, name, leader, leader_user_id, from_city, mode, size, cap, color, tags, icon, icon_kind, status, created_at)
     VALUES (?, ?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, 'emoji', 'approved', ?)`
  );
  const emojiPool = ["🎭", "📷", "🎮", "🚄", "🏙️", "🎪", "✨", "🍡", "🛼", "🎫"];
  for (let i = 0; i < TEAMS.length; i++) {
    const t = TEAMS[i];
    insertTeam.run(
      t.id,
      t.expo_id,
      t.name,
      t.leader,
      t.from_city,
      t.mode,
      t.size,
      t.cap,
      t.color,
      JSON.stringify(t.tags),
      emojiPool[i % emojiPool.length],
      new Date().toISOString()
    );
  }
}

function ensureDemoUser(dbInstance) {
  if (db.getUserByUsername(dbInstance, "demo")) return;
  const user = db.createUser(dbInstance, { username: "demo", password: "123456", nickname: "汐" });
  db.addExp(dbInstance, user.id, 250);
  db.setState(dbInstance, user.id, { favorites: ["cp-sh", "hz-cicaf"], joined: ["t7"], applied: [] });
  const sample = [
    "确认集合时间与地点",
    "准备充电宝与轻便装备",
    "与队友确认联系方式",
  ];
  for (const text of sample) db.createTodo(dbInstance, user.id, text);
}

function seedIfEmpty(dbInstance) {
  const n = dbInstance.prepare("SELECT COUNT(*) AS n FROM expos").get().n;
  if (n === 0) insertAll(dbInstance);
  ensureDemoUser(dbInstance);
}

function seedAll(dbInstance) {
  insertAll(dbInstance);
  ensureDemoUser(dbInstance);
}

if (require.main === module) {
  const c = db.connect();
  db.init(c);
  seedAll(c);
  const expoCount = c.prepare("SELECT COUNT(*) AS n FROM expos").get().n;
  const teamCount = c.prepare("SELECT COUNT(*) AS n FROM teams").get().n;
  console.log("种子数据已写入：漫展 " + expoCount + " 场，队伍 " + teamCount + " 支。");
  console.log("数据库文件：" + db.DB_PATH);
  c.close();
}

module.exports = { seedIfEmpty, seedAll, ensureDemoUser };
