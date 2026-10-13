# 一起去 · 项目日志

## 项目基本信息

- 项目名称：一起去
- 一句话定位：找到同行的人，去同一个漫展
- 核心闭环：漫展发现 → 漫展详情 → 购票跳转 → 创建/加入队伍 → 查看队伍
- 产品形态（已对齐）：
  - Web 端（电脑浏览器直接使用）
  - 移动端：跨平台框架（iOS 优先，后期上架 Android；框架待定，React Native / Flutter 二选一）
  - 服务端：Web 后端（API），后续接入
- 当前阶段：V1.0 高保真 Web 原型（纯前端 + mock 数据）

## 目录结构

```text
一起去/
  web/
    index.html        # 应用外壳（侧边栏 + 顶栏 + 视图容器）
    css/style.css     # 全部样式与设计变量
    js/main.js        # mock 数据、路由与各视图渲染逻辑
  server/
    db.js             # SQLite 建表 + 查询封装（node:sqlite，零依赖）
    seed.js           # 人工整理的种子数据（真实漫展品牌，日期待核实）
    server.js         # HTTP 服务 + REST API + 托管静态文件（零依赖）
    data.db           # SQLite 数据库文件（运行 seed.js 后生成）
  admin/
    index.html        # 管理后台页面（漫展 / 队伍管理）
    admin.css         # 管理后台样式
    admin.js          # 管理后台逻辑（增删改查走 API）
```

## 技术栈（当前）

- 纯 H5 + CSS + 原生 JavaScript
- 无框架、无构建工具、无外部依赖（图片用 CSS 渐变 + 内联 SVG 图标占位）
- Node v24 仅用于本地语法校验，运行页面不需要 Node
- 后端采用 Node 内置 `http`（计划中）+ 内置 `node:sqlite`，替代 Express / better-sqlite3（因本机无 npm 且网络受限）

## 注意事项

- 本环境无 npm/npx（Node 存在但不在 PATH），也没有图片生成工具与可用网络，因此封面图暂用 CSS 渐变占位，后续替换真实漫展图。
- 视觉预览工具在本环境无法显示截图，验证靠 `node --check` 语法校验 + Edge headless `--dump-dom` 检查 DOM。
- 不执行 git 操作；新增代码不影响现有 PPT / docx。
- 中文内容直接写入 HTML/JS/CSS 文件即可，未使用 `python -c`。

## 会话日志

### 2026-10-12 会话（首次搭建 Web 高保真原型）

- 任务：对齐产品形态后，搭建「一起去」的高保真 Web 原型（6 个页面 + 可交互）。
- 涉及文件：
  - 新增 `一起去/web/index.html`
  - 新增 `一起去/web/css/style.css`
  - 新增 `一起去/web/js/main.js`
  - 新增 `PROJECT-prompt.md`
- 完成内容：
  - 桌面端应用外壳（侧边栏导航 + 顶栏 + 视图区），响应式适配窄屏。
  - 6 个页面：漫展发现（首页）、漫展详情、队伍详情、我的队伍、行程、个人中心。
  - mock 数据：6 场漫展、8 支队伍；城市/时间筛选、搜索、收藏、申请加入、创建队伍（弹窗表单）等交互可用。
  - 视觉规范：主色玫瑰红 + 辅色青绿/琥珀，浅色底，8px 卡片圆角。
- 验证：`node --check` 通过；Edge headless 逐页渲染 6 个视图全部 `ok`，无运行时报错。
- 失误复盘：
  - 首版 `main.js` 中 `renderTrip()` 有三行字符串结尾引号写成 `"`（应为 `'`），导致整个脚本语法报错、页面空白；已修复。
  - 视觉预览工具返回 `[Unsupported Image]`，无法直接看图，改为 DOM dump 验证。
- 改进指令：下次大段拼模板字符串时，统一用单引号并保持首尾引号一致；写完后先 `node --check` 再跑浏览器验证。
- 环境笔记：见上方「注意事项」。

### 2026-10-12 会话（搭建后端数据库层）

- 任务：用 Node 内置 `node:sqlite` 建表并写入人工整理的种子数据。
- 涉及文件：
  - 新增 `一起去/server/db.js`
  - 新增 `一起去/server/seed.js`
  - 生成 `一起去/server/data.db`
- 完成内容：
  - 三张表：`expos`（漫展）、`teams`（队伍）、`user_state`（单用户收藏/加入/申请状态 JSON）。
  - `db.js` 提供 connect/init 与增删改查函数（listExpos、getExpo、listTeams、createTeam、getState/setState 等），tags 用 JSON 存储、天数由日期自动计算。
  - `seed.js` 写入 6 场真实漫展品牌 + 8 支队伍，可幂等重跑。
- 验证：`node server/seed.js` 成功写入 6 场漫展、8 支队伍；查询函数读取正常。
- 环境笔记：日期/场馆/购票链接为占位，需从官方渠道核实后替换。

### 2026-10-12 会话（后端服务端 + 管理后台 + 前端接接口）

- 任务：写 HTTP 服务端、补数据库增删改、做管理后台、把用户端从 mock 改成走 API。
- 涉及文件：
  - 新增 `一起去/server/server.js`
  - 新增 `一起去/admin/index.html`、`admin/admin.css`、`admin/admin.js`
  - 修改 `一起去/server/db.js`（补 createExpo/updateExpo/deleteExpo/updateTeam/deleteTeam，字段统一为 camelCase）
  - 修改 `一起去/web/js/main.js`（删除写死的 EXPOS/TEAMS，改为 fetch 加载 + 持久化状态）
- 完成内容：
  - `server.js`：Node 内置 http 起服务，托管 web/ 与 admin/，提供 /api/expos、/api/teams、/api/state 的完整增删改查。
  - 管理后台：漫展管理 + 队伍管理两个页签，表格 + 新增/编辑/删除表单，操作直接写库。
  - 用户端：启动时 fetch 数据渲染；收藏/申请/创建队伍改为调接口，并通过 /api/state 持久化（刷新不丢）。
- 验证：
  - `node --check` 全绿；`node server/seed.js` 重置成功。
  - 通过 PowerShell `Invoke-RestMethod` 验证：GET /api/expos 返回 6 场、GET /api/teams 返回 8 支、POST/DELETE 增删可用、`/` 与 `/admin` 返回 200。
  - 数据字段契约（expo: start/end/days/tags…；team: expoId/from/size/cap…）与前端渲染一致。
- 失误复盘：
  - 验证脚本里误用 `$home`（撞了 PowerShell 只读变量 `$HOME`）、字符串拼接用 `+`，导致一条测试数据没删干净，已用 seed 重置修复。
  - 无头 Edge 在本沙箱无法访问 localhost，`--dump-dom` 返回空，浏览器端无法截图验证；改为 Node + PowerShell 直接验证接口与字段契约。
- 环境笔记：无头浏览器访问本地服务受限，后续浏览器端联调以用户自己打开 `http://localhost:3000` 为准。

### 2026-10-13 会话（管理后台优化：封面上传 + 队伍审核 + 去返回链接）

- 任务：按反馈优化管理后台——封面支持上传图片、队伍管理改为审核模式、去掉“返回用户端”链接。
- 涉及文件：
  - 修改 `一起去/admin/index.html`、`admin/admin.css`、`admin/admin.js`
  - 修改 `一起去/server/server.js`（新增 `POST /api/upload` 与 `/uploads` 静态托管）
  - 修改 `一起去/server/db.js`（`expos` 加 `cover_image` 字段 + 迁移）
  - 修改 `一起去/web/js/main.js`、`web/css/style.css`（封面有图显图、无图渐变兜底）
- 完成内容：
  1. 去掉管理后台右上角“返回用户端”链接（两个界面独立）。
  2. 队伍管理改为“按漫展筛选 + 搜索 + 只读 + 删除”，去掉新增/编辑（队伍属用户自生成，管理员只做审核）。
  3. 封面支持上传图片：上传后存到 `server/uploads/`，数据库存图片链接；用户端有图显示图片，无图用渐变兜底。
- 验证：`node --check` 全绿；接口验证 `coverImage` 字段存在、上传接口返回 url 且图片可访问、admin 已无返回链接且有筛选栏。
- 失误复盘：
  - 旧 node 进程（PID 13040）占用端口没停干净，首轮验证打到了旧代码；`Get-NetTCPConnection` 在本沙箱权限不足返回空，改用 `Get-Process -Name node` 定位 PID 再 `Stop-Process`。
  - 验证脚本里再次踩了 PowerShell 的 `$HOME` 只读变量与字符串 `+` 拼接的坑，已规避。
- 环境笔记：停后台 node 用 `Get-Process -Name node` 找 PID 再 `Stop-Process -Force`；`Get-NetTCPConnection` 权限不足不可靠。

### 2026-10-13 会话（git 初始化 + 本地提交，推送受阻）

- 任务：把项目上传到 GitHub（`13588342376/-`）。
- 完成内容：`git init` + 新增 `.gitignore` + 首次提交（13 个文件，含 PPT/docx），`data.db`、`uploads/`、Office 临时文件已忽略。
- 未完成：推送到 GitHub 未成功——本机解析不到 `github.com`（`Could not resolve hostname github.com`），即使提权也如此，说明当前环境无外网。
- 环境笔记：此环境无法联网到 GitHub，推送需用户在本机终端自行执行；`gh` 未登录。

## 待办事项

- [x] 搭建 SQLite 数据库层（node:sqlite）并写入种子数据
- [x] 写 `server/server.js`：HTTP 服务 + REST API + 托管 web 静态文件
- [x] 做管理后台 `admin/`（漫展增删改查 + 封面上传；队伍审核：筛选/搜索/删除）
- [x] 前端 `main.js` 改为 `fetch` 拉取 API，去掉写死的 mock 数据
- [ ] 把种子数据的日期/场馆/购票链接换成真实核实信息
- [ ] 封面图补充真实漫展素材（上传能力已就绪）
- [ ] 数据生命周期（第二批）：漫展 `status` + 定时任务 + 2 个月留存清理 + “已结束”历史入口
- [ ] 移动端跨平台框架最终选型（React Native / Flutter）
- [ ] 用户系统（多用户、注册登录）
- [ ] 管理后台加简单密码/登录（上线前）
- [ ] 两人分工细化（暂缓）
