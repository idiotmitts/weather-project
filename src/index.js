function formateWeekday() {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];
  let currentDay = weekDay;
  return currentDay;
}

function formateTime() {
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let currentTime = `${hours}:${minutes}`;

  return currentTime;
}

let now = new Date();

let displayedWeekDay = document.querySelector("#current-day");
displayedWeekDay.innerHTML = formateWeekday();

let displyedTime = document.querySelector("#current-time");
displyedTime.innerHTML = formateTime();

function citySearch(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#city-search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${citySearchInput.value}`;
  searchCity(citySearchInput.value);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", citySearch);

function searchCity(city) {
  let apiKey = "3699a6fe3348afa86b71f2515e86a04b";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${unit}`;
  axios.get(apiUrl).then(showTempature);
}

//function giveCelsius(event) {
// event.preventDefault();
// let temperature = document.querySelector(".temperature");
//temperature.innerHTML = "30º";
//}
//function giveFahrenheit(event) {
//event.preventDefault();
//let temperature = document.querySelector(".temperature");
//temperature.innerHTML = "22º";
//}
//let celsius = document.querySelector("#celsius-link");
//celsius.addEventListener("click", giveCelsius);
//let fahrenheit = document.querySelector("#fahrenheit-link");
//fahrenheit.addEventListener("click", giveFahrenheit);

function showTempature(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}ºC`;
  let addtionalInfo = document.querySelector("#info");
  addtionalInfo.innerHTML = `Wind Speed ${wind}mph, Humidity ${humidity}%`;
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "3699a6fe3348afa86b71f2515e86a04b";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
  axios.get(locationUrl).then(showTempature);
}
function showPostion(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLoctonButton = document.querySelector("#current-location-button");
currentLoctonButton.addEventListener("click", showPostion);
