import { graphForecast5, ciudad, pais } from "./graphForecast5Uno.js";

(function () {

    const boton = document.querySelector('#boton');
    boton.addEventListener('click', (e) => {
        
        if (ciudad.value !== '' && pais.value !== '') {

            document.querySelector('.alert').style.display = 'none';
            document.querySelector('.alert2').style.display = 'none';
            // document.querySelector('#data').style.display = 'block';
            
            e.preventDefault();
            graphForecast5();
            document.querySelector('form').reset();
        } else {
            
            document.querySelector('.alert').style.display = 'block';
            document.querySelector('.alert2').style.display = 'block';
        }
    })
})();