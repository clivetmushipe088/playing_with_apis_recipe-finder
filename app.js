async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    
    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    resultDiv.innerHTML = '<div class="loading">Loading...</div>';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.cod !== 200) {
            showError(data.message || "City not found.");
            return;
        }

        displayWeather(data);
    } catch (error) {
        showError("Failed to fetch weather data.");
    }
}

function displayWeather(data) {
    const resultDiv = document.getElementById('weatherResult');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-info">
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <p>${data.weather[0].main} (${data.weather[0].description})</p>
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        </div>
    `;
}

function showError(message) {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = `<div class="error">${message}</div>`;
}