import { maxTempsGraph, graph1 } from "./graphTemp.js";
import { humidityGraph, graph2 } from "./graphHumidity.js";
import { windGraph, graph3 } from "./graphWind.js";
import { pressureGraph, graph4 } from "./graphPressure.js";
import { getCity, cityInput, countryInput } from "./geocode.js";
import { currentWeather } from "./weather-summary.js";

(function async() {
  /*---- Variables que se van a usar para hacer las validaciones, si no están 
  definidas es porque la app se está usando por primera vez y se ejecuta el if, 
  si están definidas se ejecuta el else if para poder reutilizar los elementos canvas ----*/
  let ciudadInput;
  let codigoPais;

  const boton = document.getElementById("boton");
  boton.addEventListener("click", (e) => {
    if (
      cityInput.value !== "" &&
      ciudadInput === undefined &&
      countryInput.value !== "" &&
      codigoPais === undefined
    ) {
      document.querySelector(".alert").style.display = "none";
      // document.querySelector(".alert2").style.display = "none";
      document.querySelector("#data").style.display = "block";

      ciudadInput = ciudad.value;
      codigoPais = pais.value;

      e.preventDefault();
      getCity().then((data) => {
        let cityData = data;
        currentWeather(cityData);
        maxTempsGraph(cityData);
        humidityGraph(cityData);
        windGraph(cityData);
        pressureGraph(cityData);
      });
    } else if (
      cityInput.value !== "" &&
      ciudadInput !== undefined &&
      countryInput.value !== "" &&
      codigoPais !== undefined
    ) {
      document.querySelector(".alert").style.display = "none";
      // document.querySelector(".alert2").style.display = "none";
      document.querySelector("#data").style.display = "block";

      // here myChart is the id of canvas
      if (Chart.getChart(graph1)) {
        Chart.getChart(graph1).destroy();
      }

      if (Chart.getChart(graph2)) {
        Chart.getChart(graph2).destroy();
      }

      if (Chart.getChart(graph3)) {
        Chart.getChart(graph3).destroy();
      }

      if (Chart.getChart(graph4)) {
        Chart.getChart(graph4).destroy();
      }

      e.preventDefault();
      getCity().then((data) => {
        let cityData = data;
        currentWeather(cityData);
        maxTempsGraph(cityData);
        humidityGraph(cityData);
        windGraph(cityData);
        pressureGraph(cityData);
      });
    } else {
      document.querySelector(".alert").style.display = "block";
      // document.querySelector(".alert2").style.display = "block";
      document.querySelector("#data").style.display = "none";
    }
  });
})();
