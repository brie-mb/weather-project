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

let search = document.querySelector(".search-form");
search.addEventListener("submit", searchEngine);

searchCity("Johannesburg");
