// Deployment script for pushing changes to both main and gh-pages branches
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting deployment process...');

try {
  // Check if we're on the main branch
  const currentBranch = execSync('git branch --show-current').toString().trim();
  console.log(`Current branch: ${currentBranch}`);
  
  if (currentBranch !== 'main') {
    console.log('Switching to main branch...');
    execSync('git checkout main');
  }
  
  // Commit any changes
  console.log('Committing changes to main branch...');
  execSync('git add .');
  execSync('git commit -m "SEO optimization updates for better search visibility"');
  execSync('git push origin main');
  
  console.log('Changes pushed to main branch successfully!');
  
  // Deploy to gh-pages
  console.log('Deploying to gh-pages branch...');
  
  // Create gh-pages branch if it doesn't exist
  try {
    execSync('git checkout gh-pages');
  } catch (error) {
    console.log('Creating gh-pages branch...');
    execSync('git checkout -b gh-pages');
  }
  
  // Copy frontend files to root for GitHub Pages
  console.log('Copying frontend files...');
  const frontendDir = path.join(__dirname, 'frontend');
  const filesToCopy = ['index.html', 'style.css', 'script.js', 'sitemap.xml', 'robots.txt'];
  
  filesToCopy.forEach(file => {
    const src = path.join(frontendDir, file);
    const dest = path.join(__dirname, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied ${file} to root directory`);
    }
  });
  
  // Commit and push to gh-pages
  console.log('Committing changes to gh-pages branch...');
  execSync('git add .');
  execSync('git commit -m "SEO optimization updates for better search visibility"');
  execSync('git push origin gh-pages');
  
  console.log('Deployment to gh-pages completed successfully!');
  
  // Switch back to main branch
  console.log('Switching back to main branch...');
  execSync('git checkout main');
  
  console.log('\nDeployment completed successfully!');
  console.log('Your SEO optimizations have been deployed to both main and gh-pages branches.');
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}