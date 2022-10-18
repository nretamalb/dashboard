// Api key: cb6ea339cd642c30d5f67cb1f287b8ee
//---Elementos Pagina---
let cityInput = document.getElementById("cityInput");
let button = document.querySelector("#myButton");
let currentTemperature = document.querySelector(".currentTemperature");
let city = document.querySelector(".cityName");

// Url: http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid={API key}
let cityName = "";
const apiKey = "cb6ea339cd642c30d5f67cb1f287b8ee";
let url =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  cityName +
  "&limit=5&appid=" +
  apiKey;

const get = (url) => {
  return Promise.resolve(
    fetch(url)
      .then((response) => {
        // console.log(cityName);
        //console.log(response.json());
        return response.json();
      })
      .catch((err) => {
        console.error(err);
      })
  );
};

async function getCity() {
  console.log("GETCITY!");
  cityName = cityInput.value;
  console.log(cityName);
  url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=" +
    apiKey;
  await get(url).then((data) => {
    currentWeather(data);
  });
}

async function currentWeather(data) {
  console.log(data);

  //--- Obtenemos Longitud y latitud---
  let lat = data[0].lat;
  let lon = data[0].lon;
  let myCity = data[0].name + ", " + data[0].country;
  console.log(`Latitud: ${lat}. Longitud: ${lon}`);
  // Hacemos llamada a API

  await get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  ).then((data) => {
    console.log(data);
    let temp = data.main.temp - 273;
    console.log(temp);
    currentTemperature.innerHTML = temp.toFixed(0) + "ºC";
    city.innerHTML = myCity;
  });
}
button.addEventListener("click", function (e) {
  e.preventDefault();
  getCity(url);
});
