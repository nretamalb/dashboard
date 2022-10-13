//(function () {
//const Chart = require("chart.js");
const apiKey = "S51VRFL8QHM1UAN7";
let urlFunction = "TIME_SERIES_INTRADAY";
let urlSymbol = "IBM";
let timeInterval = "1min";
const url =
  "https://www.alphavantage.co/query?function=" +
  urlFunction +
  "&symbol=" +
  urlSymbol +
  "&interval=" +
  timeInterval +
  "&slice=year1month1&apikey=" +
  apiKey;

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
const getStock = async () => {
  await get(url).then((data) => {
    console.log(data);
    const stock = Object.values(data)[1];
    console.log(`stock: ${stock}`);
    const stockTime = stock.map();
    //stock.map((x) => stockTime.push(x));
    console.log(`stockTime: ${stockTime}`);
    const stockV = Object.values(stock);
    console.log(`stockV: ${stockV}`); //Orden valores stockV --> Open, High, Low, Close, Volume
  });
};
// Ejecutar promesa solo "on click"
button.addEventListener("click", getStock(url));

/*---Grafico---*/

const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
  },
});
//})();
