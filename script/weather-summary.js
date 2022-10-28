//---Elementos Pagina Tarjeta Resumen, incluye nombre ciudad y temperatura actual---
let currentTemperature = document.querySelector(".city-temperature");
let city = document.querySelector(".city-name");

function currentWeather(infoCity) {
  console.log(data);

  //--- Obtenemos Longitud y latitud---
  let lat = infoCity.lat;
  let lon = infoCity.lon;
  let myCity = infoCity.cityName + ", " + infoCity.countryName;
  console.log(`Latitud: ${lat}. Longitud: ${lon}`);
  // Hacemos llamada a API
  return Promise.resolve(
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cb6ea339cd642c30d5f67cb1f287b8ee`
    ).then((data) => {
      console.log("today");
      console.log(data);
      let temp = data.main.temp - 273;
      console.log(temp);
      currentTemperature.innerHTML = temp.toFixed(0) + "ºC";
      city.innerHTML = myCity;
    })
  );
}

export { currentWeather };
