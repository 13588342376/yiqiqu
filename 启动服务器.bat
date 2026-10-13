@echo off
chcp 65001 >nul
title 一起去 - 服务器

set "NODE="
where node >nul 2>nul && set "NODE=node"
if not defined NODE (
  if exist "C:\Users\zxh06\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "NODE=C:\Users\zxh06\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
)
if not defined NODE (
  echo [错误] 未找到 Node.js。
  echo 请先安装 Node.js：https://nodejs.org/
  pause
  exit /b 1
)

cd /d "%~dp0一起去"
echo 正在启动「一起去」服务器...
echo 用户端   http://localhost:3000
echo 管理后台 http://localhost:3000/admin
echo 关闭本窗口即可停止服务器
echo.
"%NODE%" server\server.js
pause