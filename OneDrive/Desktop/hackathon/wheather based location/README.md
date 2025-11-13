# Interactive Weather Map Dashboard - Real-time Weather Visualization

A single-page web application (SPA) that serves as an interactive weather dashboard with real-time map visualization. This weather-based location finder provides detailed meteorological data with temperature-based color coding and animated visualizations.

## Features

- **Location-based Weather Search**: Search for any city or location to get detailed weather information
- **Interactive Weather Map**: Dynamic map visualization centered on the searched location with zoom capabilities
- **Real-time Weather Updates**: Automatic data refresh every 5 minutes for current conditions
- **Temperature-based Color Visualization**: Blue to red gradient color mapping based on temperature ranges
- **Weather Layer Overlays**: Color-coded overlays for clouds, precipitation, and other meteorological conditions
- **Responsive Design**: Mobile-friendly interface that works on desktop, tablet, and mobile devices
- **Stock Market Style Indicators**: Color-coded weather conditions (green for clear, red for storms, yellow for clouds)

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Leaflet.js for interactive mapping
- **Backend**: Node.js with Express.js framework
- **APIs**: 
  - Geoapify Geocoding API for location services
  - OpenWeatherMap API for real-time weather data
- **Libraries**: 
  - Leaflet.js for interactive map visualization
  - Axios for HTTP requests and API integration
- **Deployment**: Ready for Netlify frontend deployment with separate backend hosting

## Project Structure

```
.
├── backend/
│   ├── server.js          # Express server
│   ├── .env               # API keys (not included in repo)
│   └── package.json       # Dependencies
└── frontend/
    ├── index.html         # Main HTML file
    ├── style.css          # Styles
    └── script.js          # Frontend logic
```

## Keywords

weather dashboard, interactive map, real-time weather, temperature visualization, weather API, OpenWeatherMap, Geoapify, Leaflet.js, Node.js, Express, JavaScript, HTML, CSS, weather application, meteorological data, location-based service, weather forecasting, climate visualization, temperature mapping, weather conditions, weather overlay, responsive design, nihannihu, md-nihan

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- API keys from Geoapify and OpenWeatherMap

1. **Get API Keys**
   - Sign up for a free API key from [Geoapify](https://www.geoapify.com/)
   - Sign up for a free API key from [OpenWeatherMap](https://openweathermap.org/api)

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `backend` directory with your API keys:
   ```
   GEOAPIFY_API_KEY=your_geoapify_key_here
   OPENWEATHER_API_KEY=your_openweather_key_here
   ```

4. **Run the Application**
   ```bash
   cd backend
   npm start
   ```
   
   The application will be available at http://localhost:3000

## API Endpoints

- `GET /api/weather-by-location?location=:location` - Get weather data for a location

## Future Enhancements

- **Geolocation Detection**: Automatically detect user's location for instant local weather
- **Animated Weather Effects**: Dynamic weather animations for rain, snow, and wind
- **Search Autocomplete**: Real-time location suggestions as users type
- **Extended Forecast Display**: 7-day detailed weather forecast visualization
- **Map Interaction**: Click anywhere on the map to get weather for that location
- **Weather Alerts**: Notification system for severe weather conditions

## Troubleshooting

### Common Issues

If you encounter API errors:
1. Verify your API keys are correct and active
2. Check that you have internet connectivity
3. Ensure the OpenWeatherMap API key has the One Call API enabled

### Deployment Issues

For deployment problems:
1. Ensure all environment variables are properly set
2. Check that the backend server is running on the correct port
3. Verify API keys have proper permissions

## About the Developer

This project was created by [Nihan](https://github.com/nihannihu), a passionate developer focused on creating interactive web applications with real-time data visualization. You can find more of my projects on my [GitHub profile](https://github.com/nihannihu).

## License

This project is open source and available under the MIT License.