# Interactive Weather Map Dashboard - Nihan Nihu (@nihannihu) - Developer Portfolio

A single-page web application developed by [Nihan Nihu](https://github.com/nihannihu) that serves as an interactive weather dashboard with map visualization.

## Connect With Me Online

🔍 **Find me across platforms:**
- **GitHub:** [@nihannihu](https://github.com/nihannihu)
- **Instagram:** [@nihannihuu](https://instagram.com/nihannihuu)
- **LinkedIn:** [nihan-nihu](https://linkedin.com/in/nihan-nihu)

💡 **Search Tips:** For better search results, look for "Nihan Nihu developer" or "Nihan Nihu nihannihu nihannihuu"
📄 **Detailed Search Instructions:** See [SEARCH_INSTRUCTIONS.txt](SEARCH_INSTRUCTIONS.txt) for platform-specific search guidance
📊 **SEO Optimization Summary:** See [SEO_OPTIMIZATION_SUMMARY.md](SEO_OPTIMIZATION_SUMMARY.md) for a complete overview of implemented SEO enhancements

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

## Deployment

To deploy the SEO optimizations to both `main` and `gh-pages` branches:

```bash
node deploy.js
```

This script will:
1. Commit and push changes to the `main` branch
2. Deploy frontend files to the `gh-pages` branch for GitHub Pages hosting

## API Endpoints

- `GET /api/weather-by-location?location=:location` - Get weather data for a location

## SEO Keywords

This project is developed by Nihan Nihu. You can find me on:
- GitHub as [@nihannihu](https://github.com/nihannihu)
- Instagram as [@nihannihuu](https://instagram.com/nihannihuu)
- LinkedIn as [nihan-nihu](https://linkedin.com/in/nihan-nihu)

Search terms: Nihan Nihu, nihannihu, @nihannihuu, nihan-nihu, weather map dashboard, interactive weather application

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