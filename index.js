let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMin = now.getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let Details = document.querySelector(".current-details");
Details.innerHTML = `${currentDay} ${currentHour}:${currentMin}, moderate rain <br />Humidity: <strong>87%</strong>, Wind: <strong>7.2km/h</strong>`;

let search = document.querySelector(".search-form");
search.addEventListener("submit", searchEngine);

function displayTemperature(response) {
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature-value");
  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
}
function searchEngine(event) {
  event.preventDefault();
  let searchData = document.querySelector("#search-input");
  let city = searchData.value;

  let apiKey = `1ffb00o632b81060b5933b1eeta0394d`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
