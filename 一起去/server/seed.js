// 种子数据：人工整理的真实漫展品牌。
// 注意：日期、场馆、购票链接均为“待核实占位”，上线前请从官方公众号/官网逐一替换。
const db = require("./db");

const EXPOS = [
  {
    id: "cp-sh",
    name: "CP同人展 · 上海",
    glyph: "CP",
    city: "上海",
    venue: "国家会展中心",
    start_date: "2026-11-14",
    end_date: "2026-11-15",
    scale: "10万+ 人次",
    desc: "国内规模最大的综合同人创作展，聚集大量同人社团与创作者，摊位、舞台、签售一应俱全。",
    cover: "linear-gradient(120deg,#ff5f7a 0%,#f43f5e 42%,#ff8a5c 100%)",
    tags: ["综合", "超大型"],
    ticket_url: "",
  },
  {
    id: "gz-yhc",
    name: "广州萤火虫动漫游戏嘉年华",
    glyph: "萤",
    city: "广州",
    venue: "保利世贸博览馆",
    start_date: "2026-12-12",
    end_date: "2026-12-13",
    scale: "5万+ 人次",
    desc: "华南人气动漫游戏综合展，游戏厂商与国漫 IP 齐聚，现场互动与展销体验丰富。",
    cover: "linear-gradient(120deg,#0ea5e9 0%,#2563eb 55%,#6366f1 100%)",
    tags: ["游戏", "展销"],
    ticket_url: "",
  },
  {
    id: "sh-bw",
    name: "BilibiliWorld 上海",
    glyph: "BW",
    city: "上海",
    venue: "国家会展中心",
    start_date: "2027-01-01",
    end_date: "2027-01-03",
    scale: "8万+ 人次",
    desc: "B站旗下大型线下嘉年华，游戏试玩、UP主见面会、舞台演出与周边展销集中呈现。",
    cover: "linear-gradient(120deg,#0ea5e9 0%,#2563eb 55%,#6366f1 100%)",
    tags: ["游戏", "舞台"],
    ticket_url: "",
  },
  {
    id: "cd-comiday",
    name: "ComiDay 成都同人祭",
    glyph: "蓉",
    city: "成都",
    venue: "成都世纪城新会展中心",
    start_date: "2027-02-06",
    end_date: "2027-02-07",
    scale: "3万+ 人次",
    desc: "西南老牌同人创作展，以同人摊位与创作者交流为核心氛围。",
    cover: "linear-gradient(120deg,#0d9488 0%,#14b8a6 55%,#22c55e 100%)",
    tags: ["同人", "创作"],
    ticket_url: "",
  },
  {
    id: "sz-game",
    name: "深圳国际电玩节",
    glyph: "深",
    city: "深圳",
    venue: "深圳会展中心",
    start_date: "2027-03-20",
    end_date: "2027-03-21",
    scale: "3万+ 人次",
    desc: "聚焦游戏与电竞赛事的展会，现场试玩、电竞赛事与新作发布集中呈现。",
    cover: "linear-gradient(120deg,#7c3aed 0%,#a855f7 55%,#ec4899 100%)",
    tags: ["游戏", "电玩"],
    ticket_url: "",
  },
  {
    id: "hz-cicaf",
    name: "CICAF 中国国际动漫节",
    glyph: "杭",
    city: "杭州",
    venue: "白马湖国际会展中心",
    start_date: "2027-05-01",
    end_date: "2027-05-03",
    scale: "6万+ 人次",
    desc: "中国国际动漫节主展，国漫 IP 与动画展映内容丰富，是年度最受关注的动漫展会之一。",
    cover: "linear-gradient(120deg,#e11d48 0%,#f43f5e 50%,#fb7185 100%)",
    tags: ["综合", "国漫"],
    ticket_url: "",
  },
];

const TEAMS = [
  { id: "t1", expo_id: "cp-sh", name: "上海虹桥出发 · CP找摄影搭子", leader: "阿茗", from_city: "上海·虹桥", mode: "高铁", size: 3, cap: 5, tags: ["摄影", "同好", "有装备"], color: "linear-gradient(135deg,#f43f5e,#ff8a5c)" },
  { id: "t2", expo_id: "cp-sh", name: "杭州出发 · 当天往返拼车", leader: "小K", from_city: "杭州·西湖", mode: "自驾", size: 4, cap: 4, tags: ["拼车", "当天往返"], color: "linear-gradient(135deg,#0ea5e9,#6366f1)" },
  { id: "t3", expo_id: "cp-sh", name: "上海本地 · 周末漫展一起逛", leader: "Momo", from_city: "上海·浦东", mode: "地铁", size: 2, cap: 6, tags: ["本地", "新手友好"], color: "linear-gradient(135deg,#0d9488,#22c55e)" },
  { id: "t4", expo_id: "gz-yhc", name: "广州出发 · 萤火虫组队", leader: "橙子", from_city: "广州·天河", mode: "地铁", size: 3, cap: 5, tags: ["游戏", "展销"], color: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { id: "t5", expo_id: "sh-bw", name: "上海出发 · BW舞台专场一起冲", leader: "北北", from_city: "上海·浦东", mode: "地铁", size: 2, cap: 4, tags: ["舞台", "UP主"], color: "linear-gradient(135deg,#7c3aed,#ec4899)" },
  { id: "t6", expo_id: "cd-comiday", name: "成都出发 · ComiDay同人摊", leader: "阿泽", from_city: "成都·锦江", mode: "公交", size: 5, cap: 5, tags: ["同人", "摊主"], color: "linear-gradient(135deg,#0d9488,#14b8a6)" },
  { id: "t7", expo_id: "hz-cicaf", name: "杭州出发 · CICAF三天全程", leader: "汐", from_city: "杭州·滨江", mode: "高铁", size: 3, cap: 6, tags: ["国漫", "全程同行"], color: "linear-gradient(135deg,#e11d48,#fb7185)" },
  { id: "t8", expo_id: "hz-cicaf", name: "上海出发 · 杭州住一晚", leader: "栗子", from_city: "上海·静安", mode: "高铁", size: 2, cap: 4, tags: ["拼房", "住宿"], color: "linear-gradient(135deg,#f43f5e,#f59e0b)" },
];

function run() {
  const dbInstance = db.connect();
  db.init(dbInstance);

  // 幂等重跑：先清空业务数据，保留 user_state 表结构
  dbInstance.exec("DELETE FROM teams;");
  dbInstance.exec("DELETE FROM expos;");

  const insertExpo = dbInstance.prepare(
    `INSERT INTO expos (id, name, glyph, city, venue, start_date, end_date, scale, desc, cover, tags, ticket_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const e of EXPOS) {
    insertExpo.run(e.id, e.name, e.glyph, e.city, e.venue, e.start_date, e.end_date, e.scale, e.desc, e.cover, JSON.stringify(e.tags), e.ticket_url);
  }

  const insertTeam = dbInstance.prepare(
    `INSERT INTO teams (id, expo_id, name, leader, from_city, mode, size, cap, color, tags, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  for (const t of TEAMS) {
    insertTeam.run(t.id, t.expo_id, t.name, t.leader, t.from_city, t.mode, t.size, t.cap, t.color, JSON.stringify(t.tags), new Date().toISOString());
  }

  const expoCount = dbInstance.prepare("SELECT COUNT(*) AS n FROM expos").get().n;
  const teamCount = dbInstance.prepare("SELECT COUNT(*) AS n FROM teams").get().n;
  console.log("种子数据已写入：漫展 " + expoCount + " 场，队伍 " + teamCount + " 支。");
  console.log("数据库文件：" + db.DB_PATH);
  dbInstance.close();
}

run();
