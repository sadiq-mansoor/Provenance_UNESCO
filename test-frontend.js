// Simple test to check if frontend dependencies are working
const { execSync } = require('child_process');
const path = require('path');

console.log('Testing frontend compilation...');

try {
  process.chdir(path.join(__dirname, 'frontend'));
  
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Testing build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Frontend compiles successfully!');
} catch (error) {
  console.error('❌ Frontend compilation failed:', error.message);
  process.exit(1);
}