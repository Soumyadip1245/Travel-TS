import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import React, { useEffect, useRef } from "react";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export interface ChartData{
  title: string;
  xaxis: string[];
  yaxis: number[];
  label: string;
}
interface ChartProps{
  chart: ChartData
}
const BarGraph: React.FC<ChartProps> = ({chart}) => {
  console.log(chart)
  const chartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: Chart | null = null;

  useEffect(() => {

    const createChart = () => {
      if (chartRef.current) {
        chartInstance = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels: chart.xaxis,
            datasets: [
              {
                label: chart.label,
                data: chart.yaxis,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "#ffffff",
                },
              },
              x: {
                ticks: {
                  color: "#ffffff",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "#6b7280",
                },
              },
            },
          },
        });
      }
    };

    createChart();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{chart.title}</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarGraph;
