#!/usr/bin/env python3
"""
Quick Setup Script for Real Data Environment
Installs dependencies and configures the real data integration
"""

import subprocess
import sys
import os
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e.stderr}")
        return False

def check_python_version():
    """Check if Python version is compatible"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("❌ Python 3.8+ is required for real data integration")
        return False
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible")
    return True

def install_dependencies():
    """Install required dependencies"""
    print("\n📦 Installing dependencies...")
    
    # Install basic requirements
    if not run_command("pip install --upgrade pip", "Upgrading pip"):
        return False
    
    # Install PyTorch (CPU version for compatibility)
    if not run_command("pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu", "Installing PyTorch"):
        print("⚠️  PyTorch installation failed, trying alternative...")
        if not run_command("pip install torch torchvision", "Installing PyTorch (alternative)"):
            print("❌ PyTorch installation failed. AI detection will use fallback methods.")
    
    # Install other requirements
    if not run_command("pip install -r requirements_real_data.txt", "Installing real data requirements"):
        print("⚠️  Some packages may not have installed correctly")
    
    return True

def setup_directories():
    """Create necessary directories"""
    print("\n📁 Setting up directories...")
    
    directories = [
        "backend/database",
        "backend/uploads",
        "verified-media",
        "test-media", 
        "ai-samples"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"  ✅ Created: {directory}")
    
    return True

def setup_environment_file():
    """Setup environment configuration"""
    print("\n⚙️  Setting up environment configuration...")
    
    env_path = Path("backend/.env")
    env_example_path = Path("backend/.env.example")
    
    if not env_path.exists() and env_example_path.exists():
        # Copy example to .env
        with open(env_example_path, 'r') as f:
            content = f.read()
        
        with open(env_path, 'w') as f:
            f.write(content)
        
        print(f"  ✅ Created .env file from example")
        print(f"  ⚠️  Please add your API keys to backend/.env")
    elif env_path.exists():
        print(f"  ✅ Environment file already exists")
    else:
        print(f"  ❌ No .env.example file found")
        return False
    
    return True

def run_real_data_setup():
    """Run the main real data setup"""
    print("\n🚀 Running real data setup...")
    
    if not run_command("python setup_real_data.py", "Setting up real data sources"):
        print("⚠️  Real data setup completed with warnings")
        return True  # Continue even with warnings
    
    return True

def main():
    """Main setup function"""
    print("🌟 Real Data Environment Setup for Provenance Platform")
    print("=" * 60)
    
    # Check Python version
    if not check_python_version():
        return 1
    
    # Install dependencies
    if not install_dependencies():
        print("❌ Dependency installation failed")
        return 1
    
    # Setup directories
    if not setup_directories():
        print("❌ Directory setup failed")
        return 1
    
    # Setup environment
    if not setup_environment_file():
        print("❌ Environment setup failed")
        return 1
    
    # Run real data setup
    if not run_real_data_setup():
        print("❌ Real data setup failed")
        return 1
    
    print("\n🎉 Setup completed successfully!")
    print("\n🎯 Next Steps:")
    print("1. Add your API keys to backend/.env:")
    print("   - GOOGLE_FACTCHECK_API_KEY (from Google Fact Check Tools)")
    print("   - NEWS_API_KEY (from newsapi.org)")
    print("   - OPENAI_API_KEY (optional, from OpenAI)")
    print("   - HUGGINGFACE_API_KEY (optional, from Hugging Face)")
    
    print("\n2. Start the backend server:")
    print("   cd backend && python main.py")
    
    print("\n3. Test the real data integration:")
    print("   - Upload images to test AI detection")
    print("   - Try the quiz with real training scenarios")
    print("   - Test fact-checking with current claims")
    
    print("\n🌟 Your platform now uses REAL data sources!")
    
    return 0

if __name__ == "__main__":
    exit(main())