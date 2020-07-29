import React, { useState, useEffect } from "react";

import { fetchDailydata } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";


const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);
console.log(data,country)
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailydata());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            backgroundColor: "rgba(255,0,0,0.5)",
            borderColor: "rgb(204, 44, 44)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovred", " Deaths"],
        datasets: [
          {
            label: "Peaple",
            backgroundColor: [
              "rgb(48, 92, 223)",
              "#02a191",
              "rgb(204, 44, 44)",
            ],
            data: [data.confirmed.value, data.recovered.value, data.deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
