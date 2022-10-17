const graph2 = document.querySelector('#myChart2');
export const ciudad = document.querySelector('#ciudad');
export const pais = document.querySelector('#pais');

const ciudadEnviada =  () => {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad.value},${pais.value}&limit=1&appid=afa815d7eedd497bfe6a8d94b49ed7d2`;
    return funcionConsumo(url);
}

const funcionConsumo = (url) => {



    return Promise.resolve(

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(respuesta => respuesta)
    )
}


const getData2 = async (url) => {

    try {

        return await axios.get(url)
                .then(data => {
                    console.log(data)
                    return data.data.list;
                }) 
    } catch(e) {

        console.log(e);
    }
}

export const graphForecast5 = () => {

    let nombre;
    let latLon;
    let urlClima;

    ciudadEnviada()
    .then(response => {

        console.log(response);
        nombre = response[0].name;
        latLon = [response[0].lat, response[0].lon];
        urlClima = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&appid=afa815d7eedd497bfe6a8d94b49ed7d2`;
        console.log(urlClima);
        getData2(urlClima)
        .then(response => {
    
            console.log(response);
    
            let fechaHora = response.map(element => element.dt_txt);
            // console.log(fechaHora);
            let temperatura = response.map(element => element.main.temp - 273.15)
            // console.log(temperatura);
    
    
    
            const graphClima = new Chart(graph2, {
                type: 'bar',
                data: {
                    labels: fechaHora,
                    datasets: [{
                        label: `Temperatura ${nombre} en °C`,
                        data: temperatura,
                        backgroundColor: [
                            'rgb(174, 214, 241 )',
                            'rgb(133, 193, 233)',
                            'rgb(93, 173, 226)',
                            'rgb(52, 152, 219)',
                            'rgb(46, 134, 193)',
                            'rgb(40, 116, 166)'
                        ],
                        borderColor: [
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    weight: 600
                                }
                            }
                        }
                    }
                }
            });
        })
    })


}