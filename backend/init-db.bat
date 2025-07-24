@echo off
echo Initializing Database with Sample Data...
echo.
echo Installing dependencies...
call npm install
echo.
echo Running database initialization...
call npm run init-db
echo.
echo Database initialization completed!
pause
