# Weather-app

🌤️ Weather App

A simple, responsive weather web app that lets users search for any city and view the current weather, along with a Google Map of the location. The weather data is also stored in a MySQL database through a Node.js backend.

📁 Project Structure


weather-app/
├── weather.html         # Main frontend
├── weather.css          # Styles
├── weather.js           # Frontend logic (fetches + displays + posts weather)
├── server.js            # Node.js backend server
├── package.json         # NPM dependencies

🚀 Features

    Search for any city using OpenWeatherMap API

    See temperature, condition, wind speed, date, and weather icon

    Embedded Google Map for the location

    Data stored in a MySQL database

    Fully responsive design for mobile and desktop

⚙️ Requirements

    Node.js + npm

    MySQL

    OpenWeatherMap API Key (free)

    Browser (Chrome, Edge, etc.)

🛠️ Setup Instructions

1. Clone the Repository

        git clone https://github.com/yourusername/weather-app.git
        cd weather-app

2. Install Dependencies

       npm install

3. Configure Your API Key and MySQL Credentials

        In weather.js, replace:
        
        const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
        
        with your own OpenWeatherMap API key from https://openweathermap.org/api.
        
        In server.js, update the MySQL connection:
        
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',              // Replace if needed
          password: '',       // Replace with your MySQL password
          database: 'weather_app'
        });

4. Create the MySQL Database and Table

        Log into your MySQL client and run:
        
        CREATE DATABASE IF NOT EXISTS weather_app;
        
        USE weather_app;
        
        CREATE TABLE IF NOT EXISTS weather_data (
          id INT AUTO_INCREMENT PRIMARY KEY,
          city_name VARCHAR(100),
          temperature FLOAT,
          description VARCHAR(255),
          wind_speed FLOAT,
          icon_url VARCHAR(255),
          latitude FLOAT,
          longitude FLOAT,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );


▶️ Running the App

  1. Start the Backend Server
      
          node server.js
          
  You should see:
          
          Server running on http://localhost:3000
          
  2. Open the App in Your Browser
          
          Go to: http://localhost:3000


🧠 Credits

    OpenWeatherMap API

    Google Maps Embed API

    Animate.css

    Icons by Font Awesome
