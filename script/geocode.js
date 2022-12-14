//----Elementos input de la página----
let cityInput = document.getElementById("ciudad");
let countryInput = document.getElementById("pais");
//-----------------------------
// ---Variables que van al link de la API---
let cityName = "";
let countryName = "";
let lon = "";
let lat = "";

const apiKey = "cb6ea339cd642c30d5f67cb1f287b8ee";
let url = "";
//-------------------------

//----Objeto con informacion de la ciudad----
let cityData;
//----Funcion que obtiene datos de la ciudad solicitada----
const get = () => {
  //-----Tomar valores de ciudad desde el input------
  cityName = cityInput.value;
  countryName = countryInput.value;
  //-----Aplicar valores de input a url de la API-------
  url =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
const getCity = async () => {
  const data = await get();
  cityName = data[0].name;
  countryName = data[0].country;
  lon = data[0].lon;
  lat = data[0].lat;
  cityData = {
    cityName,
    countryName,
    lat,
    lon,
  };
  return cityData;
  //Creo un objeto con los valores obtenidos de respuesta y exporto
  //ese objeto para utilizarlo en index.js
};

//----Exportamos variables relevantes y funcion----
export { getCity, cityInput, countryInput };
