require('dotenv').config();
const axios = require('axios');

console.log('Environment variables loaded:');
console.log('GEOAPIFY_API_KEY:', process.env.GEOAPIFY_API_KEY ? '✓ Loaded' : '✗ Missing');
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? '✓ Loaded' : '✗ Missing');

console.log('\nActual API Key value:');
console.log(process.env.OPENWEATHER_API_KEY);

// Test if the key is properly formatted
if (process.env.OPENWEATHER_API_KEY) {
    console.log('\nAPI Key validation:');
    console.log('- Length:', process.env.OPENWEATHER_API_KEY.length);
    console.log('- Contains only valid characters:', /^[a-f0-9]+$/.test(process.env.OPENWEATHER_API_KEY) ? '✓ Yes' : '✗ No');
}