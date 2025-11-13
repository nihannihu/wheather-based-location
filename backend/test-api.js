require('dotenv').config();
const axios = require('axios');

async function testAPI() {
    console.log('Testing OpenWeatherMap API key...');
    console.log('API Key:', process.env.OPENWEATHER_API_KEY);
    
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.OPENWEATHER_API_KEY}`);
        console.log('API Key is valid!');
        console.log('Response:', response.data);
    } catch (error) {
        console.log('API Key is invalid or there was an error:');
        console.log('Error:', error.response?.data || error.message);
    }
}

testAPI();