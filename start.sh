#!/bin/bash

echo "Starting Provenance..."

echo ""
echo "Setting up test media and database..."
python3 setup.py

echo ""
echo "Starting backend server..."
cd backend
pip3 install -r requirements.txt
python3 main.py &
BACKEND_PID=$!

echo ""
echo "Waiting for backend to start..."
sleep 5

echo ""
echo "Installing frontend dependencies and starting..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo ""
echo "Provenance is now running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait