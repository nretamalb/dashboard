//---Elementos Pagina Tarjeta Resumen, incluye nombre ciudad y temperatura actual---
let currentTemperature = document.querySelector(".city-temperature");
let city = document.querySelector(".city-name");

function currentWeather(infoCity) {

  //--- Obtenemos Longitud y latitud---
  let lat = infoCity.lat;
  let lon = infoCity.lon;
  let myCity = infoCity.cityName + ", " + infoCity.countryName;
  // Hacemos llamada a API
  return Promise.resolve(
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cb6ea339cd642c30d5f67cb1f287b8ee`
    ).then(data => data.json())
    .then((data) => {
      let temp = data.main.temp - 273;
      currentTemperature.innerHTML = temp.toFixed(0) + "ºC";
      city.innerHTML = myCity;
    })
  );
}

export { currentWeather };
