#!/usr/bin/env python3
"""
Test script to verify report submission functionality
"""
import requests
import json
import os
from datetime import datetime

def test_backend_connection():
    """Test if backend is running"""
    try:
        response = requests.get("http://localhost:8000/test")
        if response.status_code == 200:
            print("✅ Backend is running")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Make sure it's running on port 8000")
        return False
    except Exception as e:
        print(f"❌ Error testing backend: {e}")
        return False

def test_report_submission():
    """Test report submission endpoint"""
    try:
        # Test data
        data = {
            'title': 'Test Suspicious Content Report',
            'description': 'This is a test report to verify the submission system works correctly.',
            'content_type': 'image',
            'location': 'Test Platform',
            'category': 'misinformation'
        }
        
        print("Testing report submission...")
        response = requests.post("http://localhost:8000/submit-report", data=data)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Report submission successful")
            print(f"Report ID: {result.get('report_id')}")
            print(f"Message: {result.get('message')}")
            return True
        else:
            print(f"❌ Report submission failed with status {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing report submission: {e}")
        return False

def test_get_reports():
    """Test getting community reports"""
    try:
        print("Testing get community reports...")
        response = requests.get("http://localhost:8000/community-reports")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Get reports successful")
            print(f"Number of reports: {len(result.get('reports', []))}")
            return True
        else:
            print(f"❌ Get reports failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing get reports: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing Provenance API Report Submission")
    print("=" * 50)
    
    # Test backend connection
    if not test_backend_connection():
        print("\n💡 To start the backend, run: python start_backend.py")
        return
    
    print()
    
    # Test report submission
    test_report_submission()
    
    print()
    
    # Test getting reports
    test_get_reports()
    
    print("\n" + "=" * 50)
    print("🏁 Testing complete")

if __name__ == "__main__":
    main()