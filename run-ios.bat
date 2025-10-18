@echo off
REM Do You Agree? - Windows quick runner for iOS (Expo)
SETLOCAL ENABLEDELAYEDEXPANSION

where npm >nul 2>&1
IF ERRORLEVEL 1 (
  echo [ERROR] Node.js (npm) is not installed or not in PATH.
  echo Download: https://nodejs.org/
  exit /b 1
)

echo Installing dependencies (this may take a minute)...
call npm install
IF ERRORLEVEL 1 (
  echo [ERROR] npm install failed.
  exit /b 1
)

echo Starting Expo on iOS...
npx expo start --ios
