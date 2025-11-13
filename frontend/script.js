// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const mapContainer = document.getElementById('map');
const weatherDetails = document.getElementById('weather-details');

// Global variables
const OPENWEATHER_API_KEY = '465c63cc77ee43d692f4e8c7a0dc430a';
// For Netlify deployment, use relative paths to utilize proxy
const BACKEND_URL = '';
let map;
let weatherLayer;
let currentMarker;

// Initialize the map
function initMap() {
    // Create map centered on world view
    map = L.map('map').setView([20, 0], 2);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

// Fetch weather data from backend
async function fetchWeather(location) {
    try {
        // Show loading state
        document.body.classList.add('loading');
        
        // Fetch data from backend
        const response = await fetch(`/api/weather-by-location?location=${encodeURIComponent(location)}`);
        
        if (!response.ok) {
            throw new Error(`Weather data not found (${response.status})`);
        }
        
        const data = await response.json();
        
        // Update UI with weather data
        updateMap(data);
        updateWeatherDetails(data);
        // For forecast API, we use the first item in the list
        addWeatherOverlay(data.weather.list[0].weather[0].main);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherDetails.innerHTML = `<div class="error">Error: ${error.message || 'Failed to fetch weather data'}</div>`;
        weatherDetails.classList.remove('hidden');
    } finally {
        // Hide loading state
        document.body.classList.remove('loading');
    }
}

// Update map with new location
function updateMap(data) {
    const { lat, lon } = data.location;
    
    // Animate to new location
    map.flyTo([lat, lon], 10, {
        animate: true,
        duration: 1.5
    });
    
    // Remove existing marker if present
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    // Add new marker
    currentMarker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`<b>${data.location.name}</b><br>Temp: ${Math.round(data.weather.list[0].main.temp)}°C`)
        .openPopup();
}

// Update weather details panel
function updateWeatherDetails(data) {
    const { location, weather } = data;
    // For forecast API, we use the first item in the list
    const current = weather.list[0].main;
    const weatherInfo = weather.list[0].weather[0];
    const wind = weather.list[0].wind || {};
    
    // Clear previous content
    weatherDetails.innerHTML = '';
    
    // Create weather details HTML
    const weatherHtml = `
        <div class="weather-header">
            <h2>${location.name}</h2>
            <div class="weather-description">
                <div class="icon">${getWeatherIcon(weatherInfo.main)}</div>
                <div>${weatherInfo.description}</div>
            </div>
        </div>
        
        <div class="weather-main">
            <div class="weather-card">
                <h3>Temperature</h3>
                <div class="value">${Math.round(current.temp)}°C</div>
                <div>Feels like ${Math.round(current.feels_like || current.temp)}°C</div>
            </div>
            
            <div class="weather-card">
                <h3>Humidity</h3>
                <div class="value">${current.humidity}%</div>
            </div>
            
            <div class="weather-card">
                <h3>Wind</h3>
                <div class="value">${Math.round(wind.speed || 0)} m/s</div>
            </div>
            
            <div class="weather-card">
                <h3>Pressure</h3>
                <div class="value">${current.pressure} hPa</div>
            </div>
        </div>
    `;
    
    weatherDetails.innerHTML = weatherHtml;
    weatherDetails.classList.remove('hidden');
}

// Add weather overlay to map
function addWeatherOverlay(weatherCondition) {
    // Remove existing weather layer if present
    if (weatherLayer) {
        map.removeLayer(weatherLayer);
    }
    
    // Determine which overlay to use based on weather condition
    let overlayType = 'clouds_new'; // Default
    
    if (weatherCondition && weatherCondition.toLowerCase().includes('rain')) {
        overlayType = 'precipitation_new';
    } else if (weatherCondition && weatherCondition.toLowerCase().includes('snow')) {
        overlayType = 'snow_new';
    } else if (weatherCondition && weatherCondition.toLowerCase().includes('cloud')) {
        overlayType = 'clouds_new';
    }
    
    // Add new weather layer
    weatherLayer = L.tileLayer(`https://tile.openweathermap.org/map/${overlayType}/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`, {
        attribution: 'Weather data © OpenWeatherMap',
        opacity: 0.7
    });
    
    weatherLayer.addTo(map);
}

// Get weather icon based on condition
function getWeatherIcon(condition) {
    const icons = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'fog': '🌫️'
    };
    
    const key = condition.toLowerCase();
    return icons[key] || '🌈';
}

// Event listeners
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = searchInput.value.trim();
    
    if (!location) {
        return;
    }
    
    fetchWeather(location);
});

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});