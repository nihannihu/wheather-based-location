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
        // Only show error for initial search, not for real-time updates
        if (!window.weatherUpdateInterval) {
            weatherDetails.innerHTML = `<div class="error">Error: ${error.message || 'Failed to fetch weather data'}</div>`;
            weatherDetails.classList.remove('hidden');
        }
    } finally {
        // Hide loading state
        document.body.classList.remove('loading');
    }
}

// Update map with new location
function updateMap(data) {
    const { lat, lon } = data.location;
    const weatherCondition = data.weather.list[0].weather[0].main.toLowerCase();
    
    // Animate to new location
    map.flyTo([lat, lon], 10, {
        animate: true,
        duration: 1.5
    });
    
    // Remove existing marker and circle if present
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    if (window.weatherCircle) {
        map.removeLayer(window.weatherCircle);
    }
    
    // Add a colored circle around the location based on weather
    const circleColor = getWeatherColor(weatherCondition);
    window.weatherCircle = L.circle([lat, lon], {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: 0.2,
        radius: 5000
    }).addTo(map);
    
    // Add new marker with weather-themed styling
    const weatherIcon = getWeatherMarkerIcon(weatherCondition);
    currentMarker = L.marker([lat, lon], { icon: weatherIcon })
        .addTo(map)
        .bindPopup(`<b>${data.location.name}</b><br>Temp: ${Math.round(data.weather.list[0].main.temp)}°C<br>Condition: ${data.weather.list[0].weather[0].description}`)
        .openPopup();
    
    // Update page background based on weather
    updatePageBackground(weatherCondition);
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
    
    // Update temperature-based visualizations
    updateTemperatureVisualization(current.temp);
    
    // Start real-time updates for this location
    startRealTimeUpdates(location.name);
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

// Get weather color based on condition (stock market style colors)
function getWeatherColor(condition) {
    const colors = {
        'clear': '#00FF00',     // Bright green for clear skies (good)
        'clouds': '#FFFF00',    // Yellow for clouds (caution)
        'rain': '#1E90FF',      // Bright blue for rain
        'drizzle': '#1E90FF',   // Bright blue for drizzle
        'thunderstorm': '#FF0000', // Red for thunderstorms (warning)
        'snow': '#87CEEB',      // Light blue for snow
        'mist': '#FFA500',      // Orange for mist (caution)
        'fog': '#FFA500'        // Orange for fog (caution)
    };
    
    return colors[condition] || '#1E90FF'; // Default to bright blue
}

// Get weather marker icon (stock market style colors)
function getWeatherMarkerIcon(condition) {
    const iconColors = {
        'clear': '#00FF00',     // Bright green
        'clouds': '#FFFF00',    // Yellow
        'rain': '#1E90FF',      // Bright blue
        'drizzle': '#1E90FF',   // Bright blue
        'thunderstorm': '#FF0000', // Red
        'snow': '#87CEEB',      // Light blue
        'mist': '#FFA500',      // Orange
        'fog': '#FFA500'        // Orange
    };
    
    const color = iconColors[condition] || '#1E90FF'; // Default to bright blue
    
    // Create a custom icon using Leaflet's DivIcon
    return L.divIcon({
        className: 'weather-marker',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
}

// Update page background based on weather
function updatePageBackground(condition) {
    const body = document.body;
    
    // Remove any existing weather classes
    body.className = body.className.replace(/weather-\w+/g, '').trim();
    
    // Add weather-specific class
    body.classList.add(`weather-${condition}`);
    
    // Apply gradient background based on weather
    const gradients = {
        'clear': 'linear-gradient(135deg, #74b9ff, #0984e3)',
        'clouds': 'linear-gradient(135deg, #636e72, #b2bec3)',
        'rain': 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
        'drizzle': 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
        'thunderstorm': 'linear-gradient(135deg, #2d3436, #636e72)',
        'snow': 'linear-gradient(135deg, #81ecec, #74b9ff)',
        'mist': 'linear-gradient(135deg, #dfe6e9, #b2bec3)',
        'fog': 'linear-gradient(135deg, #dfe6e9, #b2bec3)'
    };
    
    const gradient = gradients[condition] || 'linear-gradient(135deg, #74b9ff, #0984e3)';
    body.style.background = gradient;
}

// Function to map temperature to color (blue to red gradient)
function getColorForTemperature(temp) {
    // Normalize temperature to a value between 0 and 1
    // Assuming -20°C to 40°C range for mapping
    const normalized = Math.min(Math.max((temp + 20) / 60, 0), 1);
    
    // Calculate RGB values for blue to red gradient
    const red = Math.round(255 * normalized);
    const blue = Math.round(255 * (1 - normalized));
    const green = Math.round(255 * (1 - Math.abs(normalized - 0.5) * 2));
    
    return `rgb(${red}, ${green}, ${blue})`;
}

// Function to update temperature-based visualizations
function updateTemperatureVisualization(temp) {
    // Update weather card background based on temperature
    const weatherCards = document.querySelectorAll('.weather-card');
    const tempColor = getColorForTemperature(temp);
    
    // Apply color to temperature card with transparency
    weatherCards.forEach(card => {
        const heading = card.querySelector('h3');
        if (heading && heading.textContent.includes('Temperature')) {
            card.style.background = `linear-gradient(135deg, ${tempColor}20, white)`;
            card.style.borderLeft = `5px solid ${tempColor}`;
        }
    });
    
    // Update main background with temperature-based color
    const body = document.body;
    body.style.background = `linear-gradient(135deg, ${tempColor}40, ${getComplementaryColor(tempColor)}40)`;
}

// Helper function to get complementary color
function getComplementaryColor(rgbColor) {
    // Extract RGB values
    const match = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        
        // Return complementary color
        return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    }
    return '#87CEEB'; // Default sky blue
}

// Function to start real-time updates
function startRealTimeUpdates(location) {
    // Clear any existing interval
    if (window.weatherUpdateInterval) {
        clearInterval(window.weatherUpdateInterval);
    }
    
    // Set up interval to update weather data every 5 minutes (300000 ms)
    window.weatherUpdateInterval = setInterval(() => {
        fetchWeather(location);
    }, 300000); // 5 minutes
}

// Function to stop real-time updates
function stopRealTimeUpdates() {
    if (window.weatherUpdateInterval) {
        clearInterval(window.weatherUpdateInterval);
        window.weatherUpdateInterval = null;
    }
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});