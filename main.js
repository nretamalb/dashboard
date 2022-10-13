//(function () {
//const Chart = require("chart.js");
const apiKey = "S51VRFL8QHM1UAN7";
let urlFunction = "TIME_SERIES_DAILY";
let urlSymbol = "IBM";
let timeInterval = "1min";
// const url =
//   urlFunction +
//   "&symbol=" +
//   urlSymbol +
//   // "&interval=" +
//   //timeInterval +
//   //"&slice=year1month1
//   "&apikey=" +
//   apiKey;

let url =
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=S51VRFL8QHM1UAN7";
let button = document.querySelector("#myButton");

const get = (url) => {
  return Promise.resolve(
    fetch(url)
      .then((response) => {
        //console.log(response.json());
        return response.json();
      })
      .catch((err) => {
        console.error(err);
      })
  );
};

let stockDates = [];
let closePrice = [];

const getStock = async () => {
  await get(url).then((data) => {
    console.log(data);
    const stock = Object.values(data)[1]; //Lista de objetos (cada objeto es una fecha)
    stockDates = Object.keys(stock);
    //console.log(`stock Dates: ${JSON.stringify(stockDates)}`);
    const dateValues = Object.values(stock); //Lista de objetos, muestra valores/Orden valores stockV --> Open, High, Low, Close, Volume
    //console.log(`DatesValues: ${JSON.stringify(dateValues)}`);

    //---GetStock Close Price ---
    dateValues.forEach((element) => {
      console.log(element);
      closePrice.push(element["4. close"]);
    });
    console.log(closePrice);
    const myChart = new Chart(chart, {
      type: "line",
      data: {
        labels: stockDates,
        datasets: [
          {
            label: "# of Votes",
            data: closePrice,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
};

// Ejecutar promesa solo "on click"
button.addEventListener("click", getStock(url));

/*---Grafico---*/

const chart = document.getElementById("myChart");
//})();
