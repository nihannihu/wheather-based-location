require('dotenv').config();
const axios = require('axios');

async function testForecastAPI() {
    try {
        console.log('Testing forecast API with London coordinates...');
        
        // First get coordinates for London using Geoapify
        const geoapifyUrl = `https://api.geoapify.com/v1/geocode/search?text=London&apiKey=${process.env.GEOAPIFY_API_KEY}`;
        const geoResponse = await axios.get(geoapifyUrl);
        const { lat, lon } = geoResponse.data.features[0].properties;
        
        console.log(`London coordinates: ${lat}, ${lon}`);
        
        // Test the forecast API
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        const forecastResponse = await axios.get(forecastUrl);
        
        console.log('Forecast API response status:', forecastResponse.status);
        console.log('Number of forecast entries:', forecastResponse.data.list.length);
        console.log('First forecast item temp:', forecastResponse.data.list[0].main.temp);
        
        console.log('Test successful! The forecast API should work with the application.');
    } catch (error) {
        console.log('Error occurred:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
        }
    }
}

testForecastAPI();