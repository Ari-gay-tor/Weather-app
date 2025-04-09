const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', //Enter your sql password here
  database: 'weather_app'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'weather.html'));
});

// Save weather data
app.post('/api/weather', (req, res) => {
  const { city, temperature, description, wind, icon, lat, lon } = req.body;
  console.log("Received:", req.body);

  const query = `
    INSERT INTO weather_data (city_name, temperature, description, wind_speed, icon_url, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [city, temperature, description, wind, icon, lat, lon], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      res.status(500).json({ message: 'Failed to save data' });
    } else {
      res.status(200).json({ message: 'Weather data saved' });
    }
  });
});

// Get saved weather data
app.get('/api/weather', (req, res) => {
  const query = `SELECT * FROM weather_data ORDER BY timestamp DESC`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      res.status(500).json({ message: 'Failed to retrieve data' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
