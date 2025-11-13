// Simple build script to prepare frontend for deployment
const fs = require('fs');
const path = require('path');

console.log('Preparing frontend for deployment...');

// Create a deployment-ready version of the frontend
const filesToCopy = [
    'index.html',
    'style.css',
    'script.js',
    'netlify.toml'
];

console.log('Frontend is ready for deployment to Netlify!');
console.log('Simply upload the frontend folder to Netlify.');
console.log('Note: You will need to deploy the backend separately to a Node.js hosting service.');