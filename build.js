const { execSync } = require('child_process');

try {
  if (process.platform === 'win32') {
    console.log('Running Windows build steps...');
    execSync('powershell -ExecutionPolicy Bypass -File .\\build-alternative.ps1', { stdio: 'inherit' });
  } else {
    console.log('Running Linux build steps...');
    execSync('prisma generate && next build', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
