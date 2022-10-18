import { graph1, ciudad, pais, graphForecast5Uno } from "./graphForecast5Uno.js";
import { graph2, graphForecast5Dos } from "./graphForecast5Dos.js";

(function () {

    let ciudadInput;
    let codigoPais;

    const boton = document.querySelector('#boton');
    boton.addEventListener('click', (e) => {
        
        if ((ciudad.value !== '' && ciudadInput === undefined) && (pais.value !== '' && codigoPais === undefined)) {

            document.querySelector('.alert').style.display = 'none';
            document.querySelector('.alert2').style.display = 'none';
            document.querySelector('#data').style.display = 'block';
            
            ciudadInput = ciudad.value;
            codigoPais = pais.value;

            e.preventDefault();
            graphForecast5Uno();
            graphForecast5Dos();
            
        } else if ((ciudad.value !== '' && ciudadInput !== undefined) && (pais.value !== '' && codigoPais !== undefined)) {

            document.querySelector('.alert').style.display = 'none';
            document.querySelector('.alert2').style.display = 'none';
            document.querySelector('#data').style.display = 'block';

            // here myChart is the id of canvas
            if (Chart.getChart(graph1)) {
                Chart.getChart(graph1).destroy();
            }

            if (Chart.getChart(graph2)) {
                Chart.getChart(graph2).destroy();
            }

            e.preventDefault();
            graphForecast5Uno();
            graphForecast5Dos();
        } else {
            
            document.querySelector('.alert').style.display = 'block';
            document.querySelector('.alert2').style.display = 'block';
            document.querySelector('#data').style.display = 'none';
        };
    });
})();