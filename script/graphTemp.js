//Elemento canvas de tarjeta que muestra temperaturas maximas
const graph1 = document.querySelector("#myChart1");

//----Obtenemos informacion de la temperatura utilizando la api correspondiente----
const getTempData = (infoCity) => {
  let lat = infoCity.lat;
  let lon = infoCity.lon;

  return Promise.resolve(
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=afa815d7eedd497bfe6a8d94b49ed7d2`
    ).then((data) => data.json())
  );
};

/*---- Tomamos informacion entregada por la api y exportamos la informacion
correspondiente a las fechas y sus temperaturas para ese dia----*/
const dataRefactoring = async (infoCity) => {
  return await getTempData(infoCity).then((response) => {
    console.log(response.list);
    let fecha = [
      ...new Set(response.list.map((element) => element.dt_txt.split(" ")[0]))
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
      console.log('Se ejecutó con today');
      for (let i = 0; i < fecha.length; i++) {
        today = Number(ddToday) + i;

        filtro = response.list.filter((element) =>
          element.dt_txt.includes(`-${today}`)
        );

        arrayDivisionPorFechas.push(filtro);
      }
    } else {
      console.log('Se ejecutó con tomorrow');
      for (let i = 0; i < fecha.length; i++) {
        tomorrow = Number(ddTomorrow) + i;

        filtro = response.list.filter((element) =>
          element.dt_txt.includes(`-${tomorrow}`)
        );

        arrayDivisionPorFechas.push(filtro);
      }
    }

    let valorFechaPrimeraVez = arrayDivisionPorFechas.map(
      (element) => element[0]
    );

    let temperatura = valorFechaPrimeraVez.map(
      (element) => element.main.temp_max
    );

    let temperaturaCelcius = valorFechaPrimeraVez.map(
      (element) => element.main.temp_max - 273.15
    );
    return [fecha, temperaturaCelcius];
  });
};

//---- Generamos grafico con la informacion ya filtrada
const maxTempsGraph = (infoCity) => {
  dataRefactoring(infoCity).then((response) => {
    let fecha = response[0];
    let temperaturaCelcius = response[1];
    console.log(infoCity);
    const graphTemp = new Chart(graph1, {
      type: "bar",
      data: {
        labels: fecha,
        datasets: [
          {
            label: `Temperatura ${infoCity.cityName} en °C`,
            data: temperaturaCelcius,
            backgroundColor: ["#fddb3a"],
            borderColor: ["#fddb3a)"],
            borderWidth: 1,
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

export { maxTempsGraph, graph1 };
