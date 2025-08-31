#!/usr/bin/env python3
"""
Simple script to start the backend server
"""
import subprocess
import sys
import os

def start_backend():
    """Start the FastAPI backend server"""
    try:
        # Change to backend directory
        backend_dir = os.path.join(os.getcwd(), 'backend')
        
        print("Starting Provenance API backend...")
        print(f"Backend directory: {backend_dir}")
        
        # Start uvicorn server
        cmd = [
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--reload", 
            "--host", "0.0.0.0",
            "--port", "8000"
        ]
        
        print(f"Running command: {' '.join(cmd)}")
        print("Backend will be available at: http://localhost:8000")
        print("API docs available at: http://localhost:8000/docs")
        print("\nPress Ctrl+C to stop the server")
        
        # Run the server
        subprocess.run(cmd, cwd=backend_dir)
        
    except KeyboardInterrupt:
        print("\nShutting down backend server...")
    except Exception as e:
        print(f"Error starting backend: {e}")
        return False
    
    return True

if __name__ == "__main__":
    start_backend()