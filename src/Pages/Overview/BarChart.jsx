import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";

export default function BarChart({ data }) {
  useEffect(() => {
    const output = [];
    const labels = [];
		Chart.register(...registerables);

    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        labels.push(data[i].villageName);
        output.push(data[i].populationSize);
      }
    } else {
      labels.push(
        "Jabalia",
        "Beit Lahia",
        "Quds",
        "Shejaiya",
        "Hebron",
        "Nablus",
        "Ramallah",
        "Beit Jala"
      );
      output.push(168568, 89838, 428304, 100000, 160470, 130326, 24599, 14563);
    }

    const chart = new Chart("chart3", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: "rgba(77, 206, 204, 0.2)",
            borderColor: "rgba(77, 206, 204, 1)",
            label: "Population",
            data: output,
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      },
    });
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className="chart card" id="bar-chart">
      <canvas id="chart3"></canvas>
    </div>
  );
}