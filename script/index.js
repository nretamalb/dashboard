import { maxTempsGraph } from "./graphTemp.js";
import { graph2, graphForecast5Dos } from "./graphForecast5Dos.js";
import { graph3, graphForecast5Tres } from "./graphForecast5Tres.js";
import { graph4, graphForecast5Cuatro } from "./graphForecast5Cuatro.js";
import { getCity } from "./geocode.js";

// console.log(getCity());
// console.log(cityData);

(function async() {
  let ciudadInput;
  let codigoPais;

  const boton = document.querySelector("#boton");
  boton.addEventListener("click", (e) => {
    if (
      ciudad.value !== "" &&
      ciudadInput === undefined &&
      pais.value !== "" &&
      codigoPais === undefined
    ) {
      document.querySelector(".alert").style.display = "none";
      document.querySelector(".alert2").style.display = "none";
      document.querySelector("#data").style.display = "block";

      ciudadInput = ciudad.value;
      codigoPais = pais.value;

      e.preventDefault();
      // console.log(cityData);
      
      maxTempsGraph(getCity());
      // graphForecast5Dos();
      // graphForecast5Tres();
      // graphForecast5Cuatro();
    } else if (
      ciudad.value !== "" &&
      ciudadInput !== undefined &&
      pais.value !== "" &&
      codigoPais !== undefined
    ) {
      document.querySelector(".alert").style.display = "none";
      document.querySelector(".alert2").style.display = "none";
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
      // graphForecast5Uno();
      // graphForecast5Dos();
      // graphForecast5Tres();
      // graphForecast5Cuatro();
    } else {
      document.querySelector(".alert").style.display = "block";
      document.querySelector(".alert2").style.display = "block";
      document.querySelector("#data").style.display = "none";
    }
  });
})();
