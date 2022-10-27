const graph2 = document.querySelector("#myChart2");
const ciudad = document.querySelector("#ciudad");
const pais = document.querySelector("#pais");

let getHumidityData = (infoCity) => {
  let lat = infoCity.lat;
  let lon = infoCity.lon;

  return Promise.resolve(
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=afa815d7eedd497bfe6a8d94b49ed7d2`
    ).then((data) => data.json())
  );
};

// const forecast5API = async (url) => {
//   try {
//     return await axios.get(url).then((data) => data.data.list);
//   } catch (e) {
//     console.error(e);
//   }
// };

const dataRefactoring = async (infoCity) => {
  return await getHumidityData(infoCity).then((response) => {
    console.log(response);
    let fecha = [
      ...new Set(response.list.map((element) => element.dt_txt.split(" ")[0])),
    ];

    let today = new Date();
    let ddToday = String(today.getDate()).padStart(2, "0");

    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    let ddTomorrow = String(tomorrow.getDate()).padStart(2, "0");

    let filtro;
    let arrayDivisionPorFechas = [];

    // Esto es porque la api no está sincronizada con el horario local
    if (response.list[0].dt_txt.split(" ")[0].includes(`-${ddToday}`)) {
      for (let i = 0; i < fecha.length; i++) {
        today = Number(ddToday) + i;

        filtro = response.list.filter((element) =>
          element.dt_txt.includes(`-${today}`)
        );

        arrayDivisionPorFechas.push(filtro);
      }
    } else {
      for (let i = 0; i < fecha.length; i++) {
        tomorrow = Number(ddTomorrow) + i;

        filtro = response.filter((element) =>
          element.dt_txt.includes(`-${tomorrow}`)
        );

        arrayDivisionPorFechas.push(filtro);
      }
    }

    let valorFechaPrimeraVez = arrayDivisionPorFechas.map(
      (element) => element[0]
    );

    let humidity = valorFechaPrimeraVez.map((element) => element.main.humidity);

    return [fecha, humidity];
  });
};

const humidityGraph = (infoCity) => {
  dataRefactoring(infoCity).then((response) => {
    let fecha = response[0];
    let humidity = response[1];
    const graphClima = new Chart(graph2, {
      type: "line",
      data: {
        labels: fecha,
        datasets: [
          {
            label: `Humedad relativa (%) en ${infoCity.cityName}`,
            data: humidity,
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
                weight: 600,
              },
            },
          },
        },
      },
    });
  });
};

export { humidityGraph };
