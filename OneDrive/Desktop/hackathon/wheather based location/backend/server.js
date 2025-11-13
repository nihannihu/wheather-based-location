const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to get weather by location
app.get('/api/weather-by-location', async (req, res) => {
  try {
    const { location } = req.query;
    
    // Input validation
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }
    
    // Geocoding: Convert location name to lat/lon using Geoapify
    const geoapifyUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${process.env.GEOAPIFY_API_KEY}`;
    const geoResponse = await axios.get(geoapifyUrl);
    
    // Check if Geoapify returned valid results
    if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    const { lat, lon } = geoResponse.data.features[0].properties;
    const formattedName = geoResponse.data.features[0].properties.formatted;
    
    // Weather fetching: Get weather data from OpenWeatherMap
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const weatherResponse = await axios.get(openWeatherUrl);
    
    // Combine data
    const responseData = {
      location: {
        name: formattedName,
        lat,
        lon
      },
      weather: weatherResponse.data
    };
    
    // Send response
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    console.error('Error details:', error.response?.data || error);
    
    // More specific error handling
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ error: 'Invalid API key for weather service' });
      } else if (error.response.status === 404) {
        return res.status(404).json({ error: 'Weather data not found' });
      } else {
        return res.status(error.response.status).json({ error: `Weather service error: ${error.response.statusText}` });
      }
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data: ' + error.message });
  }
});

// Serve static files from the frontend directory
app.use(express.static(__dirname + '/../frontend'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});