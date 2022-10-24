(function () {
  //----Elementos input de la pagina pagina----
  let cityInput = document.getElementById("ciudad");
  let countryInput = document.getElementById("pais");
  //-----------------------------
  // ---Variables que van al link de la API---
  let cityName = "";
  let countryName = "";
  const apiKey = "cb6ea339cd642c30d5f67cb1f287b8ee";
  let url = "";
  //-------------------------
  //----Funcion que obtiene datos de la ciudad solicitada----
  const get = () => {
    //-----Tomar valores de ciudad desde el input------
    cityName = cityInput.value;
    countryName = countryInput.value;
    //-----Aplicar valolres de input a url de la API-------
    url =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "," +
      countryName +
      "&limit=5&appid=" +
      apiKey;

    //------Promesa que entrega latitud y longitud de la ciudad
    return Promise.resolve(
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.error(err);
        })
    );
  };
});

//----Exportamos variables relevantes y funcion----

export { cityName, cityInput, get };
