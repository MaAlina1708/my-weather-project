let currentDate = document.querySelector("#current-date");

let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();

currentDate.innerHTML = `${hours}:${minutes}, ${day}, ${month}, ${date}`;

// week 5 search function

function showTemperature(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = response.data.name;
  let degreeDisplay = document.querySelector("#temperature");
  degreeDisplay.innerHTML = Math.round(response.data.main.temp);
  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = `Humidity ${response.data.main.humidity} %`;
  let windDisplay = document.querySelector("#windspeed");
  windDisplay.innerHTML = `Wind : ${response.data.wind.speed} km/h`;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "173ad7f0400a4a67080b878412caf07f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  searchCity(searchBar.value);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", displayCity);

// week 5 use current position display weather and city name

function showPosition(position) {
  let apiKey = "173ad7f0400a4a67080b878412caf07f";
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentlocation");
button.addEventListener("click", getCurrentLocation);
