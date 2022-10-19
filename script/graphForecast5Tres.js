const graph3 = document.querySelector('#myChart3');
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

const graphForecast5Tres = () => {

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
    
            let fechaHora = [...new Set(response.map(element => element.dt_txt.split(' ')[0]))]; 

            // let today = new Date();
            // let dd = String(today.getDate()).padStart(2, '0');
            // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // let yyyy = today.getFullYear();

            // for (let i = 0; i < fechaHora.length; i++) {

                
            //     today = Number(yyyy) + '-' + Number(mm) + '-' + (Number(dd) + i);
            // }

            let wind = response.map(element => Math.round(element.wind.speed * 1.609));    
    
            
            const graphClima = new Chart(graph3, {
                type: 'line',
                data: {
                    labels: fechaHora,
                    datasets: [{
                      label: `Viento (km/h) en ${nombre}`,
                      data: wind,
                      fill: true,
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1
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

export {graph3, graphForecast5Tres}