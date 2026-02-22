@echo off
echo ============================================================
echo    Prestige Build - Construction Website Setup Script
echo ============================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js v18 or higher.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo.

REM Check if MongoDB is running
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MongoDB might not be running.
    echo Please make sure MongoDB is installed and running.
    echo Download from: https://www.mongodb.com/try/download/community
    echo.
)

echo ============================================================
echo   Backend Setup
echo ============================================================
echo.

cd server

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [OK] .env file created
) else (
    echo [OK] .env file already exists
)

REM Install backend dependencies
echo Installing backend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Seed database
echo Seeding database with sample data...
call npm run seed
echo [OK] Database seeded
echo.

cd ..

echo ============================================================
echo   Frontend Setup
echo ============================================================
echo.

cd client

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [OK] .env file created
) else (
    echo [OK] .env file already exists
)

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

cd ..

echo.
echo ============================================================
echo            Setup completed successfully!
echo ============================================================
echo.
echo Next steps:
echo.
echo 1. Start the backend server:
echo    cd server
echo    npm run dev
echo.
echo 2. In a new terminal, start the frontend:
echo    cd client
echo    npm run dev
echo.
echo 3. Open your browser:
echo    Frontend: http://localhost:5173
echo    Backend API: http://localhost:5000/api
echo.
echo Happy building!
echo.
pause
