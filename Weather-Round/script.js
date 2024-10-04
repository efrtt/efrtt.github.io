const apiKey = "e572229aa271970dbd029e7c88824ee7"; // Replace with your OpenWeatherMap API key
const city = "San Ramon"; // Change to your desired city
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.main) {
      const temp = Math.round(data.main.temp);
      const cityName = data.name;
      const weatherCondition = data.weather[0].main.toLowerCase();

      // Map weather conditions to Font Awesome icons
      let iconClass;

      if (weatherCondition.includes("clear")) {
        iconClass = "fa-sun";
      } else if (weatherCondition.includes("clouds")) {
        iconClass = "fa-cloud";
      } else if (weatherCondition.includes("rain")) {
        iconClass = "fa-cloud-showers-heavy";
      } else if (weatherCondition.includes("snow")) {
        iconClass = "fa-snowflake";
      } else {
        iconClass = "fa-question-circle"; // Default icon
      }

      document.getElementById("temperature").innerText = `${temp}°F`;
      document.getElementById("weatherIcon").className = `far ${iconClass}`;
      document.getElementById("cityName").innerText = cityName;
    } else {
      console.error("No data found for the specified city.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

window.onload = getWeather;
