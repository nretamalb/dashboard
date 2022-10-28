//Elemento canvas de tarjeta que muestra la humedad relativa
const graph2 = document.querySelector("#myChart2");

//----Obtenemos la informacion utilizando la api correspondiente----
let getHumidityData = (infoCity) => {

  let lat = infoCity.lat;
  let lon = infoCity.lon;

  return Promise.resolve(

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=afa815d7eedd497bfe6a8d94b49ed7d2`
    ).then((data) => data.json())

  );
};

/*---- Tomamos informacion entregada por la api y exportamos la informacion
correspondiente a las fechas y humedad para ese dia----*/
const dataRefactoring = async (infoCity) => {

  return await getHumidityData(infoCity).then((response) => {
    console.log(response.list);

    /*---- Hacemos una coleccion de valores unicos con los valores de la propiedad dt_txt que correponde a las fechas 
    de los dias de las predicciones ----*/
    let fecha = [
      ...new Set(response.list.map((element) => element.dt_txt.split(" ")[0])),
    ];

    // Uso de la libreria MomentJS para trabajar con fechas
    const formato = "DD";

    let today = moment();
    let ddToday = today.format(formato).padStart(2, "0");

    // Se declaran las variables que se van a usar para la validación en else
    let tomorrow;
    let ddTomorrow;

    let filtro;
    let arrayDivisionPorFechas = [];

    // Esto es porque la api no está sincronizada con el horario local
    if (response.list[0].dt_txt.split(" ")[0].includes(`-${ddToday}`)) {

      console.log("Se ejecutó con today");
      for (let i = 0; i < fecha.length; i++) {

        today = moment().add(i, "days");
        ddToday = today.format(formato).padStart(2, "0");

        // Primer filtro es para extraer todos los elementos que incluyen el valor de ddToday
        filtro = response.list.filter((element) =>
          element.dt_txt.includes(`-${ddToday}`)
        );

        // Hacemos push al array para poder separar en cada indice de este los elementos con las mismas fechas
        arrayDivisionPorFechas.push(filtro);
      }

    } else {

      console.log("Se ejecutó con tomorrow");
      for (let i = 0; i < fecha.length; i++) {

        tomorrow = moment().add(i + 1, "days");
        ddTomorrow = tomorrow.format(formato).padStart(2, "0");

        filtro = response.list.filter((element) =>
          element.dt_txt.includes(`-${ddTomorrow}`)
        );

        arrayDivisionPorFechas.push(filtro);

      }
    }

    // Hacemos un map del primer indice de cada elemento del array valorFechaPrimeraVez
    let valorFechaPrimeraVez = arrayDivisionPorFechas.map(
      (element) => element[0]
    );

    // Accedemos a la propiedad humidity de cada elemento y lo mapeamos
    let humidity = valorFechaPrimeraVez.map((element) => element.main.humidity);

    return [fecha, humidity];
  });
};

//---- Generamos grafico con la informacion ya filtrada
const humidityGraph = (infoCity) => {

  dataRefactoring(infoCity).then((response) => {

    let fecha = response[0];
    let humidity = response[1];

    const graphHumidity = new Chart(graph2, {
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

export { humidityGraph, graph2 };
