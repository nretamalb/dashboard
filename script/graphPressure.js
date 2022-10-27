const graph4 = document.querySelector('#myChart4');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');

const inputData = () => {

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
            .then(data => data.data.list)

    } catch (e) {

        console.error(e);
    }
}

const graphForecast5Cuatro = () => {

    let nombre;
    let latLon;
    let urlClima;

    inputData()
        .then(response => {

            nombre = response[0].name;
            latLon = [response[0].lat, response[0].lon];
            urlClima = `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&appid=afa815d7eedd497bfe6a8d94b49ed7d2`;

            forecast5API(urlClima)
                .then(response => {

                    let fecha = [...new Set(response.map(element => element.dt_txt.split(' ')[0]))];

                    let today = new Date();
                    let ddToday = String(today.getDate()).padStart(2, '0');

                    let tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    let ddTomorrow = String(tomorrow.getDate()).padStart(2, '0');

                    let filtro;
                    let arrayDivisionPorFechas = [];

                    // Esto es porque la api no está sincronizada con el horario local
                    if (response[0].dt_txt.split(' ')[0].includes(`-${ddToday}`)) {

                        for (let i = 0; i < fecha.length; i++) {

                            today = (Number(ddToday) + i);

                            filtro = response.filter(element => element.dt_txt.includes(`-${today}`));

                            arrayDivisionPorFechas.push(filtro);
                        }
                    } else {

                        for (let i = 0; i < fecha.length; i++) {

                            tomorrow = (Number(ddTomorrow) + i);

                            filtro = response.filter(element => element.dt_txt.includes(`-${tomorrow}`));

                            arrayDivisionPorFechas.push(filtro);
                        }
                    }

                    let valorFechaPrimeraVez = arrayDivisionPorFechas.map(element => element[0]);

                    let pressure = valorFechaPrimeraVez.map(element => element.main.pressure);

                    const graphClima = new Chart(graph4, {
                        type: 'doughnut',
                        data: {
                            labels: fecha,
                            datasets: [{
                                label: `Presión Atmosférica (hPa) en ${nombre}`,
                                data: pressure,
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(35, 130, 205)'
                                ],
                                hoverOffset: 4
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

export { graph4, graphForecast5Cuatro }