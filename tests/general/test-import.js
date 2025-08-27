// Test import to debug the issue
try {
  const { theatres, venues, news } = require('./lib/database');
  console.log('Import successful');
  console.log('Theatres length:', theatres.length);
  console.log('First theatre:', theatres[0]?.name);
} catch (error) {
  console.error('Import error:', error.message);
  console.error('Stack:', error.stack);
}