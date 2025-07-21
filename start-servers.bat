@echo off
echo Starting MERN Resume Builder...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "node server.js"
cd ..

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Development Server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting up!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
