# Plant Disease Scanner - AI Crop Disease Detection by Nihan Nihu (nihannihu)

A web application designed to help farmers by leveraging AI for crop disease detection, soil type prediction, and customized fertilizer recommendations. Developed by Nihan Nihu (nihannihu) using advanced machine learning and deep learning techniques.

**Connect with me:**
- GitHub: [@nihannihu](https://github.com/nihannihu)
- Instagram: [@nihannihuu](https://www.instagram.com/nihannihuu/)
- LinkedIn: [nihan-nihu](https://www.linkedin.com/in/nihan-nihu/)

## Project Structure

This project consists of two separate servers:

1. **Main Web App** (Node.js/Express/MongoDB)
   - Handles the user interface (HTML/CSS/JS frontend)
   - Manages user uploads (leaf photos)
   - Stores results in MongoDB database
   - Communicates with the AI server via API

2. **AI Server** (Python/Flask)
   - Runs the AI models for disease detection and soil analysis
   - Provides a simple API for the main web app

## How to Run

### Prerequisites

1. Node.js and npm installed
2. Python 3.x installed
3. MongoDB installed and running

### Deployment Options

This application can be deployed in multiple environments:

1. **Local Development** - Run both servers locally as described below
2. **Vercel** - Deploy the web application to Vercel (see DEPLOYMENT_INSTRUCTIONS.md)
3. **Render** - Deploy both applications to Render (using the provided render.yaml files)

### Setting up the Main Web App

1. Navigate to the `plant-disease-scanner` directory:
   ```
   cd plant-disease-scanner
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   or
   ```
   node server.js
   ```

### Setting up the AI Server

1. Navigate to the `ai-server` directory:
   ```
   cd ai-server
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Start the server:
   ```
   python ai_server.py
   ```

### Training the AI Models

To train the models with your own data:

1. For crop disease detection:
   ```
   python train_disease_model.py
   ```

2. For soil type prediction:
   ```
   python train_soil_model.py
   ```

### Running the Full Application

1. Terminal 1: Run your AI server: `python ai_server.py`
2. Terminal 2: Run your Web server: `npm start`
3. Browser: Open http://localhost:3000

## Features

- Upload a photo of a crop leaf for disease detection
- Get AI-powered predictions on plant diseases
- Clean, user-friendly interface
- Responsive design that works on mobile and desktop
- Loading indicators during analysis
- Results stored in MongoDB for future reference

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Server**: Python with Flask
- **AI Models**: TensorFlow (for image classification), Scikit-learn (for tabular data)

## API Endpoints

### Main Web App (Node.js)
- `GET /` - Serve the frontend application
- `POST /api/analyze` - Analyze uploaded image

### AI Server (Python)
- `GET /` - Health check endpoint
- `POST /predict` - Predict disease from image

## Future Enhancements

- Soil type prediction based on location and sensor data
- Fertilizer recommendation system
- Prediction history dashboard
- Mobile application
- User authentication and profiles
- Multi-language support

## Find Me Online

Search for "Nihan Nihu" on any platform to find my profiles:
- GitHub: Search "nihannihu" 
- Instagram: Search "@nihannihuu"
- LinkedIn: Search "nihan-nihu"

## About the AI Model

I (Nihan Nihu) personally built and trained the AI model used in this plant disease detection system. The model uses TensorFlow for image classification and was trained on a diverse dataset of plant leaf images to accurately identify various crop diseases.

## SEO Keywords

Nihan Nihu, nihannihu, @nihannihuu, nihan-nihu, plant disease detection, crop disease finder, AI agriculture, agricultural technology, plant health, farming technology, ArogyaKrishi, machine learning, deep learning, TensorFlow, AI developer, tech innovator
