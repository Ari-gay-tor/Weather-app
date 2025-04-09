const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = ''; //Enter your OpenWeatherMap API key here

async function weatherFn(cName) {
	if (!cName) return alert('Please enter a city name');
	const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
	const lat = data.coord.lat;
	const lon = data.coord.lon;
	const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;

	$('#city-name').text(data.name);
	$('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
	$('#temperature').html(`${data.main.temp}°C`);
	$('#description').text(data.weather[0].description);
	$('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
	$('#weather-icon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
	$('#map').attr('src', mapUrl);
	$('#weather-info').fadeIn();

	// Send weather data to backend
	fetch('http://localhost:3000/api/weather', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			city: data.name,
			temperature: data.main.temp,
			description: data.weather[0].description,
			wind: data.wind.speed,
			icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
			lat: lat,
			lon: lon
		})
	})
	.then(res => res.json())
	.then(response => {
		console.log("Weather saved:", response);
	})
	.catch(err => console.error("Error saving weather:", err));
}
