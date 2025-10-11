@echo off
echo =====================================================
echo Restarting Backend Server with Fixes
echo =====================================================
echo.

REM Kill any existing Python processes on port 5002
echo Checking for existing server process...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5002') do (
    echo Found process on port 5002 (PID: %%a)
    taskkill /F /PID %%a
    echo Process killed.
)

echo.
echo Starting backend server...
cd /d "c:\Users\rafey1\Desktop\youtude video final\snapsavepro\backend"
start "Backend Server" venv\Scripts\python.exe app.py

echo.
echo =====================================================
echo Backend server starting...
echo Check the new window for server logs
echo Server will be available at http://127.0.0.1:5002
echo =====================================================
echo.
pause
