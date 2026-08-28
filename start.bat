@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found on this machine.
  echo Install it from https://nodejs.org ^(LTS version^), then double-click this file again.
  pause
  exit /b 1
)

node scripts\launch.mjs

echo.
echo Server stopped.
pause
