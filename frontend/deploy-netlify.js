// Simple script to prepare files for Netlify deployment
const fs = require('fs');
const path = require('path');

console.log('Preparing files for Netlify deployment...');

// Files to ensure are in the frontend directory for Netlify
const requiredFiles = ['index.html', 'style.css', 'script.js', 'sitemap.xml', 'robots.txt', 'netlify.toml'];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file} is present`);
  } else {
    console.log(`✗ ${file} is missing`);
  }
});

console.log('\nTo deploy to Netlify:');
console.log('1. Go to https://netlify.com');
console.log('2. Connect your GitHub repository or drag the frontend folder to Netlify');
console.log('3. Set the publish directory to "/"');
console.log('4. Set the build command to "echo \'Frontend build complete\'"');
console.log('5. Deploy!');

console.log('\nYour site will be live at your Netlify subdomain or custom domain.');