@echo off
echo 🔧 Checking for port conflicts before starting Docker...

echo.
echo 📋 Checking port 5000 (Backend)...
netstat -ano | findstr :5000
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Port 5000 is in use! Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
        echo 🛑 Killing process with PID: %%a
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
) else (
    echo ✅ Port 5000 is available
)

echo.
echo 📋 Checking port 3000 (Frontend)...
netstat -ano | findstr :3000
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Port 3000 is in use! Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        echo 🛑 Killing process with PID: %%a
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
) else (
    echo ✅ Port 3000 is available
)

echo.
echo 📋 Checking port 27017 (MongoDB)...
netstat -ano | findstr :27017
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Port 27017 is in use! Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :27017') do (
        echo 🛑 Killing process with PID: %%a
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 >nul
) else (
    echo ✅ Port 27017 is available
)

echo.
echo 🐳 Starting Docker containers...
docker-compose up -d

echo.
echo 📊 Container status:
docker-compose ps

echo.
echo 🌐 Your application is running at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo   MongoDB:  localhost:27017
echo.
echo 📋 To view logs: docker-compose logs -f
echo 🛑 To stop: docker-compose down
pause
