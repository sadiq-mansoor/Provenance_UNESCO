#!/bin/bash

# Media Literacy App Deployment Script
echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Navigate to frontend directory if it exists
if [ -d "frontend" ]; then
    cd frontend
    print_status "Navigated to frontend directory"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_status "Building for production..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

print_success "Build completed successfully!"

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    print_status "Vercel CLI found. Deploying to Vercel..."
    vercel --prod
elif command -v netlify &> /dev/null; then
    print_status "Netlify CLI found. Deploying to Netlify..."
    netlify deploy --prod --dir=build
else
    print_warning "No deployment CLI found. Please choose your deployment method:"
    echo ""
    echo "1. Install Vercel CLI: npm install -g vercel"
    echo "2. Install Netlify CLI: npm install -g netlify-cli"
    echo "3. Deploy manually by uploading the 'build' folder"
    echo ""
    echo "Your build is ready in the 'build' folder!"
fi

print_success "Deployment script completed!"
print_status "Don't forget to:"
echo "  - Set up environment variables in your deployment platform"
echo "  - Configure your API keys"
echo "  - Test all features after deployment"
echo "  - Set up monitoring and analytics"
