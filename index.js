function displayWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.city;
  let currentTemperature = document.querySelector("#current-temperature-value");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = response.data.condition.description;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = `${response.data.wind.speed}km/hr`;
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  currentTime.innerHTML = fullDate(date);
  let currentIcon = document.querySelector("#current-temperature-icon");
  currentIcon.innerHTML = `<img src='${response.data.condition.icon_url}'alt='weather icon'>`;

  getForecast(response.data.city);
}
function fullDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = `1ffb00o632b81060b5933b1eeta0394d`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchEngine(event) {
  event.preventDefault();
  let searchData = document.querySelector("#search-input");
  searchCity(searchData.value);
}
function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "1ffb00o632b81060b5933b1eeta0394d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#weather-forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class='weather-forecast-container'><div class='col-2'> <div class="weather-forecast-day">${formatDays(
          day.time
        )}</div> <img
            src="${day.condition.icon_url}"
             class='weather-forecast-icon'
          /></div>
        <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong></span>
            <span class="weather-forecast-temp-min">${Math.round(
              day.temperature.minimum
            )}°</span>
          </div></div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

let search = document.querySelector(".search-form");
search.addEventListener("submit", searchEngine);

searchCity("Johannesburg");
