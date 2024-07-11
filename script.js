document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

function getWeatherData(location) {
    const apiKey = 'e450cb8af5578434d423748251946d4c'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(`Error: ${error.message}`);
        });
}

function displayWeatherData(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const weatherInfo = `
        <div class="weather-info">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        </div>
    `;
    weatherDisplay.innerHTML = weatherInfo;
    weatherDisplay.style.display = 'block';
}
