@echo off
rem Opens the game in its own Chrome/Edge window with a separate profile.
rem That profile has graphics acceleration on, while your normal browser settings stay as they are.
set "URL=https://hany36.github.io/Hany36/fps/"
set "PROFILE=%LOCALAPPDATA%\JamminiFPS"
set "B="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "B=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined B if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "B=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined B if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "B=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if not defined B if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "B=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not defined B if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "B=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not defined B (
  echo Chrome or Edge was not found.
  pause
  exit /b 1
)
start "" "%B%" --user-data-dir="%PROFILE%" --no-first-run --no-default-browser-check --ignore-gpu-blocklist --force-high-performance-gpu --app="%URL%"
