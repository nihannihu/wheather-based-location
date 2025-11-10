# Interactive Weather Map Dashboard

A single-page web application that serves as an interactive weather dashboard with map visualization.

## Features

- Search for any location to get detailed weather information
- Interactive map centered on the searched location
- Color-based weather layer overlay (clouds, precipitation, etc.)
- Responsive design that works on desktop and mobile devices

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (ES6+), Leaflet.js
- **Backend**: Node.js with Express
- **APIs**: 
  - Geoapify Geocoding API
  - OpenWeatherMap API (One Call API 2.5)
- **Libraries**: 
  - Leaflet.js for interactive maps
  - Axios for HTTP requests

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

## Setup Instructions

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

- Geolocation: Automatically detect user's location
- Animated weather effects: Use leaflet-weather for dynamic effects
- Search autocomplete: Provide suggestions as user types
- Forecast display: Show 7-day forecast
- Click on map: Get weather for any point on the map

## Troubleshooting

If you encounter API errors:
1. Verify your API keys are correct and active
2. Check that you have internet connectivity
3. Ensure the OpenWeatherMap API key has the One Call API enabled