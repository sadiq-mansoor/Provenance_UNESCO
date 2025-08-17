@echo off
echo Starting Provenance...

echo.
echo Setting up test media and database...
python setup.py

echo.
echo Starting backend server...
start cmd /k "cd backend && pip install -r requirements.txt && python main.py"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Installing frontend dependencies and starting...
cd frontend
call npm install
call npm start

echo.
echo Provenance should now be running!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000