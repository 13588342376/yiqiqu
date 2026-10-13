@echo off
chcp 65001 >nul
title 一起去 - 停止服务器

powershell -NoProfile -ExecutionPolicy Bypass -Command "$pids = (netstat -aon | Select-String ':3000' | Select-String 'LISTENING' | ForEach-Object { ($_.Line.Trim() -split '\s+')[4] } | Select-Object -Unique); if ($pids) { $pids | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }; exit 0 } else { exit 1 }"

if errorlevel 1 (
  echo 端口 3000 上没有正在运行的服务器。
) else (
  echo 已停止端口 3000 上的服务器。
)
pause