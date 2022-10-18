const graph1 = document.querySelector('#myChart1');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');

const inputData =  () => {

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad.value},${pais.value}&limit=1&appid=afa815d7eedd497bfe6a8d94b49ed7d2`;
    return geocoderAPI(url);
}

const geocoderAPI = (url) => {



    return Promise.resolve(

        fetch(url)
            .then(respuesta => respuesta.json())
    )
}


const forecast5API = async (url) => {

    try {

        return await axios.get(url)
                .then(data => {
                    // 2
                    console.log(data)
                    return data.data.list;
                }) 
    } catch(e) {

        console.log(e);
    }
}

const graphForecast5Uno = () => {

    let nombre;
    let latLon;
    let urlClima;

    inputData()
    .then(response => {
        // 1 Devuelve un JSON adentro de un array
        console.log(response);
        nombre = response[0].name;
        latLon = [response[0].lat, response[0].lon];
        urlClima = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&appid=afa815d7eedd497bfe6a8d94b49ed7d2`;

        forecast5API(urlClima)
        .then(response => {
            // 3
            console.log(response);
    
            let fechaHora = response.map(element => element.dt_txt);
            
            let temperatura = response.map(element => element.main.temp - 273.15)    
    
    
            const graphClima = new Chart(graph1, {
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

export {graph1, ciudad, pais, graphForecast5Uno}