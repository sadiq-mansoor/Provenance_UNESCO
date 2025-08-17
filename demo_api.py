#!/usr/bin/env python3
"""
Demo script to test the Provenance API
Run this after starting the backend server
"""

import requests
import json
import os

API_BASE = "http://localhost:8000"

def test_api():
    print("🧪 Testing Provenance API\n")
    
    # Test root endpoint
    try:
        response = requests.get(f"{API_BASE}/")
        print("✅ Root endpoint:", response.json()["message"])
    except Exception as e:
        print("❌ Backend not running. Start with: cd backend && python main.py")
        return
    
    # Test quiz endpoint
    try:
        response = requests.get(f"{API_BASE}/quiz")
        quiz_data = response.json()
        print(f"✅ Quiz loaded: {len(quiz_data['questions'])} questions")
    except Exception as e:
        print("❌ Quiz endpoint failed:", e)
    
    # Test leaderboard
    try:
        response = requests.get(f"{API_BASE}/leaderboard")
        leaderboard = response.json()
        print(f"✅ Leaderboard loaded: {len(leaderboard['leaderboard'])} users")
    except Exception as e:
        print("❌ Leaderboard endpoint failed:", e)
    
    # Test social feed
    try:
        response = requests.get(f"{API_BASE}/feed")
        feed = response.json()
        print(f"✅ Social feed loaded: {len(feed['posts'])} posts")
    except Exception as e:
        print("❌ Feed endpoint failed:", e)
    
    # Test file analysis (if test image exists)
    test_image = "test-media/sample_photo.jpg"
    if os.path.exists(test_image):
        try:
            with open(test_image, 'rb') as f:
                files = {'file': ('sample_photo.jpg', f, 'image/jpeg')}
                response = requests.post(f"{API_BASE}/analyze", files=files)
                analysis = response.json()
                print(f"✅ File analysis: {analysis['authenticity']} ({analysis['confidence']} confidence)")
        except Exception as e:
            print("❌ File analysis failed:", e)
    
    print(f"\n🎯 API is ready! Frontend should be at http://localhost:3000")

if __name__ == "__main__":
    test_api()