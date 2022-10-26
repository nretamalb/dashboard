import { maxTempsGraph, graph1 } from "./graphTemp.js";
import { graph2, graphForecast5Dos } from "./graphForecast5Dos.js";
import { graph3, graphForecast5Tres } from "./graphForecast5Tres.js";
import { graph4, graphForecast5Cuatro } from "./graphForecast5Cuatro.js";
import { getCity } from "./geocode.js";


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
      getCity().then((data) => {
        let cityData = data;
        maxTempsGraph(cityData);
      });

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

      // if (Chart.getChart(graph2)) {
      //   Chart.getChart(graph2).destroy();
      // }

      if (Chart.getChart(graph3)) {
        Chart.getChart(graph3).destroy();
      }

      if (Chart.getChart(graph4)) {
        Chart.getChart(graph4).destroy();
      }

      e.preventDefault();
      getCity().then((data) => {
        let cityData = data;
        maxTempsGraph(cityData);
      });
    } else {
      document.querySelector(".alert").style.display = "block";
      document.querySelector(".alert2").style.display = "block";
      document.querySelector("#data").style.display = "none";
    }
  });
})();
