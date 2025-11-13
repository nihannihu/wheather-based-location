require('dotenv').config();
const axios = require('axios');

async function testFullFlow() {
    try {
        console.log('Testing full flow with London...');
        
        // Step 1: Geocoding with Geoapify
        console.log('1. Testing Geoapify geocoding...');
        const geoapifyUrl = `https://api.geoapify.com/v1/geocode/search?text=London&apiKey=${process.env.GEOAPIFY_API_KEY}`;
        const geoResponse = await axios.get(geoapifyUrl);
        console.log('   Geoapify response:', geoResponse.status);
        
        const { lat, lon } = geoResponse.data.features[0].properties;
        const formattedName = geoResponse.data.features[0].properties.formatted;
        console.log('   Location:', formattedName, `(${lat}, ${lon})`);
        
        // Step 2: Weather with OpenWeatherMap (basic endpoint)
        console.log('2. Testing OpenWeatherMap basic endpoint...');
        const basicWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        const basicWeatherResponse = await axios.get(basicWeatherUrl);
        console.log('   Basic weather response:', basicWeatherResponse.status);
        
        // Step 3: Weather with OpenWeatherMap (One Call endpoint)
        console.log('3. Testing OpenWeatherMap One Call endpoint...');
        const oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        const oneCallResponse = await axios.get(oneCallUrl);
        console.log('   One Call response:', oneCallResponse.status);
        
        console.log('All tests passed! The application should work correctly.');
    } catch (error) {
        console.log('Error occurred:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
        }
    }
}

testFullFlow();