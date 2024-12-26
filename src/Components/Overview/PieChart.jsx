import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react';

export default function PieChart({ title, xValues, yValues, colors,id }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: colors,
              data: yValues,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
        },
      });
    }
  }, [xValues, yValues, colors, title]);

  return (
    <div className="chart card" id={id}>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
