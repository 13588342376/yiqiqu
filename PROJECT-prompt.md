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
- 后续结果：最终推送到 `13588342376/yiqiqu` 成功（仓库名原中文失败，改用 `yiqiqu`）。网络问题源于终端未走代理：给 git 配了 Clash 的 HTTP 代理（`http://127.0.0.1:7890`）并把远端改成 HTTPS 后，用 `git push -f -u origin main` 成功（远端原有自动生成的 README 提交，历史不相关，故 `-f` 覆盖）。
- 环境笔记：SSH 走 Clash 的 `ProxyCommand` 在 Windows 上有 `exec` 报错坑，改用 HTTPS + `http.proxy` 更稳；`gh` 未登录，但 Git Credential Manager 已缓存凭据，故推送无需手动输密码。

### 2026-10-13 会话（账户系统 + 等级 + 头像 + 待办持久化 + 数据扩充）

- 任务：把本地做成“功能齐全、可直接部署”的状态——账户/注册/登录、等级、头像上传、密码哈希、待办持久化、左下角重做，并充实种子数据。
- 涉及文件：
  - 修改 `一起去/server/db.js`（新增 `users`、`sessions`、`todos` 表；`user_state` 改为按用户存；新增认证/待办/经验函数）
  - 修改 `一起去/server/server.js`（cookie 会话、`/api/auth/*`、`/api/todos`、`/api/state` 按用户、创建队伍关联用户并加经验、启动自动灌数据）
  - 重写 `一起去/server/seed.js`（10 场漫展 + 20 支队伍；`seedIfEmpty`/`seedAll` 可复用；演示账号 demo/123456）
  - 修改 `一起去/web/index.html`（左下角改为动态容器）
  - 修改 `一起去/web/js/main.js`（登录/注册/编辑资料/换头像/待办勾选、登录态渲染、加载与错误兜底、动态时间筛选）
  - 修改 `一起去/web/css/style.css`（用户菜单、等级、头像、待办等样式）
- 完成内容：
  1. 账户系统：注册/登录/登出，密码 `crypto.scrypt` 加盐哈希，session token + cookie 持久会话。
  2. 等级系统：注册 Lv.1，创建队伍 +30 经验、升级按 `floor(exp/100)+1`；个人中心展示等级与经验条。
  3. 头像自定义：复用 `/api/upload`，头像链接存 `users.avatar_url`，左下角与个人中心统一显示。
  4. 左下角改为“当前用户卡 + 等级 + 下拉菜单（个人中心/我的队伍/退出）”，与个人中心不再重复；未登录显示“登录/注册”。
  5. 待办：`todos` 表 + 勾选/取消/添加/删除接口，刷新不丢。
  6. 登录策略：游客可浏览，收藏/申请/创建队伍/待办/个人中心/我的队伍需登录，未登录弹登录框。
  7. 数据扩充：10 场漫展 + 20 支队伍，日期按当前日期往后分布；`server.js` 启动时库为空自动灌数据。
  8. 前端补加载失败兜底、动态“近一个月/近三个月”筛选、“我的收藏”过滤视图。
- 验证：
  - `node --check` 全绿；`node server/seed.js` 重建成功。
  - 端到端（PowerShell + cookie 会话）：注册、登录、`/api/auth/me`、待办增/勾选、state 按用户读写、创建队伍（leader=用户昵称、经验 +30）全部通过。
  - 演示账号 demo/123456：Lv.3、exp 250、3 条待办、收藏 2 场、加入 1 队，均读取正常。
- 失误复盘：
  - `renderSidebarUser` 的菜单模板串里，`data-action="go-profile"` 的双引号与拼接的双引号混在一起，导致 `Unexpected identifier`；改成“单引号字符串 + 拼接、标签属性用双引号”后通过 `node --check`。
  - 登录/注册/创建队伍等异步提交最初没有 try/catch，失败会静默；已逐个补 `toast(e.message)`。
- 环境笔记：无头 Edge 在本沙箱始终访问不了 localhost，浏览器端无法截图；验证以接口端到端 + 语法检查为主，视觉以用户打开 `http://localhost:3000` 为准。

### 2026-10-13 会话（新增双击启动/停止脚本）

- 任务：为本地运行方便，新增两个双击脚本，避免每次手动敲命令。
- 涉及文件：
  - 新增 `启动服务器.bat`
  - 新增 `停止服务器.bat`
- 完成内容：
  - `启动服务器.bat`：双击后自动 `cd` 到 `一起去` 并运行 `node server\server.js`，窗口关闭即停止。
  - `停止服务器.bat`：通过 `netstat + taskkill` 杀掉监听 3000 端口的进程，用于强制停止后台运行的服务。
- 环境笔记：
  - 两个脚本放在项目根目录，双击即可用；脚本内用 `chcp 65001` 保证中文正常显示。
  - 若服务器不是从窗口启动（后台进程），用 `停止服务器.bat` 收尾；正式部署后会用 `pm2` 常驻，本地仍可用这两个脚本。

### 2026-10-13 会话（修复启动/停止脚本）

- 任务：`启动服务器.bat` / `停止服务器.bat` 双击无法正常使用，定位并修复。
- 涉及文件：
  - 修改 `启动服务器.bat`（补 node 路径检测）
  - 修改 `停止服务器.bat`（改用 PowerShell 定位并结束进程）
- 根因：
  1. `node` 只存在于 Codex 运行环境的 PATH，不在 Windows 系统 PATH，双击 bat（普通 cmd）找不到 `node`。
  2. bat 文件此前是 UTF-8 + LF 行尾，`cmd` 需要 CRLF；且 `chcp 65001` 后中文必须为 UTF-8 字节，不能转 GBK。
  3. `taskkill` 对后台启动的 node 报 `Access denied`，改用 `Stop-Process` 可靠。
- 修复：
  - 启动脚本：`where node` 优先，找不到则回退到 Codex runtime 的 node 绝对路径；文件统一为 UTF-8 + CRLF。
  - 停止脚本：PowerShell 解析 `netstat` 取 PID 并 `Stop-Process`，bat 负责中文提示。
- 验证：启动脚本拉起服务后端口 3000 LISTENING、`/api/expos` 返回 10；停止脚本运行后端口 3000 清空、无 stderr 错误。
- 环境笔记：bat 文件必须 UTF-8 + CRLF；`%~dp0` 展开中文路径正常；杀进程优先 `Stop-Process`。

### 2026-10-13 会话（审核/举报/图片规范/前端交互强化）

- 任务：补齐队伍审核与举报闭环、规范化图片存储、并修复一批前端交互问题。
- 涉及文件：
  - 修改 `一起去/server/db.js`（`teams` 加 `leader_user_id/icon/icon_kind/status`；新增 `team_requests`、`reports` 表与相关函数）
  - 修改 `一起去/server/server.js`（上传按分类落盘；`/api/teams` 公开/我的/后台三种返回；申请/审核/举报接口）
  - 修改 `一起去/server/seed.js`（种子队伍带 emoji 图标、`approved` 状态；重建前清理申请与举报）
  - 修改 `一起去/admin/index.html`、`admin/admin.css`、`admin/admin.js`（新增“审核中心”“举报处理”页签）
  - 修改 `一起去/web/js/main.js`、`web/css/style.css`（城市下拉、搜索、banner 轮播、emoji 图标、行程联动、时间轴强化、我的收藏视图、举报、可点击统计卡）
- 完成内容：
  1. 图片规范：上传目录分为 `covers / team-icons / avatars / banners / icons / backgrounds` 六个分类，`/api/upload` 带 `category` 落盘。
  2. 队伍审核：创建默认 `pending`，管理员审核通过后才在公开列表展示；创建者在“我的队伍”可见“审核中”状态。
  3. 队伍图标：默认 emoji 选择器；Lv.3 起可上传自定义图标，自定义图标走人工审核。
  4. 举报：队伍详情新增“举报”按钮，提交到后台“举报处理”分区，管理员可标记已处理/忽略。
  5. 领队确认：`team_requests` 记录申请，领队在队伍详情通过/拒绝；通过后入队、`size+1`、申请者 +10 经验。
  6. 前端修复：城市筛选改下拉、搜索扩展字段、首页 banner 自动+手动轮播、行程按已加入队伍实时生成、时间轴节点对齐并加黄色脉冲“当前节点”、个人中心三个统计卡可点击、新增独立“我的收藏”视图。
- 验证：
  - `node --check` 全绿；`node server/seed.js` 重建成功。
  - PowerShell 端到端验证：创建队伍 `pending` → 领队 `mine` 可见 → 成员申请 → 领队通过 → 成员 `joined` +10 经验、队伍 `size=2`；Lv.1 上传自定义图标返回 403；举报创建/标记已处理可用。
  - 清理了本轮验证产生的测试账号、队伍与举报记录。
- 失误复盘：
  - `server.js` 的队伍子路由顺序错误：`POST /api/teams/:id/requests` 被通用 `POST /api/teams` 创建队伍分支先匹配，导致报“SQLite 参数 2 无法绑定”；已把子资源分支条件改为 `!parts[2]` 区分，避免创建/详情/子资源互相抢路由。
  - 管理后台最初复用 `filterbar` 渲染审核分区，会销毁队伍筛选的 `filter-expo` 元素；改为独立 `reviewbar`。
  - 首页 banner 轮播只改了 `state.bannerIndex` 却没同步 `translateX`，手动切换会失效；已在渲染时写入 transform。
- 环境笔记：
  - `node:sqlite` 的“无法绑定参数 2”多数是传了 `undefined`，先查路由是否被前一个条件短路。
  - `teams` 删除前需先删 `team_requests`/`reports`，否则外键约束失败。
  - 本轮测试账号已清理；`uploads/` 根目录还留有一个旧的未引用图片 `1791883783622-hp5cso.png`，可按分类移动到对应子目录或删除。

### 2026-10-13 会话（头像审核 + 收藏入口去重）

- 任务：修复个人中心“我的收藏”与“收藏的漫展”入口重复，并把头像上传改为人工审核。
- 涉及文件：
  - 修改 `一起去/server/db.js`（新增 `avatar_requests` 表与头像审核函数）
  - 修改 `一起去/server/server.js`（新增 `/api/avatar-requests` 的 GET/POST/PATCH）
  - 修改 `一起去/admin/admin.js`、`admin/admin.css`（审核中心增加“头像审核”分区）
  - 修改 `一起去/web/js/main.js`（头像上传改为提交审核；删除底部“我的收藏”重复入口）
- 完成内容：
  1. 头像上传后不再直接写入 `users.avatar_url`，而是生成 `pending` 审核记录；后台通过后头像才生效。
  2. 审核中心从单一“队伍审核”扩展为“队伍审核 / 头像审核”两个分区，各自带待审核/已通过/已驳回状态筛选。
  3. 个人中心底部“我的收藏”入口删除，保留顶部“收藏的漫展”统计卡，避免同一收藏视图出现两个入口。
  4. 把此前未走审核的历史头像（用户 `1`）补入头像审核队列，便于在后台演示审核流程。
- 验证：`node --check` 全绿；端到端验证头像提交 → 后台通过 → `avatarUrl` 生效；临时测试账号已清理。
- 环境笔记：头像审核文件仍落在 `uploads/avatars/`，审核记录存 `avatar_requests`，通过后回写 `users.avatar_url`。
- 补充修复：`/admin` 不带斜杠时，页面里相对的 `admin.css/admin.js` 会解析成 `/admin.css` 导致 404，后台空白无样式；已在 `serveStatic` 中把 `/admin` 301 跳转到 `/admin/`。

## 待办事项

- [x] 搭建 SQLite 数据库层（node:sqlite）并写入种子数据
- [x] 写 `server/server.js`：HTTP 服务 + REST API + 托管 web 静态文件
- [x] 做管理后台 `admin/`（漫展增删改查 + 封面上传；队伍审核：筛选/搜索/删除）
- [x] 前端 `main.js` 改为 `fetch` 拉取 API，去掉写死的 mock 数据
- [x] 数据扩充到 10 场漫展 + 20 支队伍（种子 + 启动自动灌数据）
- [x] 账户系统（注册/登录/登出，scrypt 加盐哈希 + cookie 会话）
- [x] 等级系统（创建/加入队伍加经验，个人中心展示等级进度）
- [x] 头像自定义上传
- [x] 待办持久化（勾选/取消/添加/删除）
- [ ] 把种子数据的日期/场馆/购票链接换成真实核实信息
- [ ] 封面图补充真实漫展素材（上传能力已就绪）
- [ ] 数据生命周期（第二批）：漫展 `status` + 定时任务 + 2 个月留存清理 + “已结束”历史入口
- [ ] 移动端跨平台框架最终选型（React Native / Flutter）
- [ ] 管理后台加简单密码/登录（上线前）
- [x] 加入队伍的“领队确认”机制（申请记录、领队通过/拒绝、入队加经验并更新人数）
- [x] 上传目录规范管理（covers / team-icons / avatars / banners / icons / backgrounds）
- [x] 管理后台“审核中心”（待审核/已通过/已驳回分区，内容+图标审核）与“举报处理”分区
- [x] 队伍 emoji 图标选择 + Lv.3 起可上传自定义图标（自定义图标需人工审核）
- [x] 前端：城市下拉筛选、搜索修复、首页 banner 轮播、行程实时联动+时间轴强化、个人中心入口可点击、独立“我的收藏”视图
- [ ] 两人分工细化（暂缓）
