(function () {
  //---Elementos Pagina Tarjeta Resumen, incluye nombre ciudad y temperatura actual---
  let currentTemperature = document.querySelector(".city-temperature");
  let city = document.querySelector(".city-name");

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
});

export { currentWeather };
