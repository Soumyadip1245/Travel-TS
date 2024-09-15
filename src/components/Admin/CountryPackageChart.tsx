import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import React, { useEffect, useRef } from "react";

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CountryPackageChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: Chart | null = null;

  useEffect(() => {
    const chartData = [
      { country: "France", packageCount: 6 },
      { country: "Japan", packageCount: 4 },
      { country: "Brazil", packageCount: 4 },
      { country: "Australia", packageCount: 4 },
      { country: "Italy", packageCount: 4 },
      { country: "Canada", packageCount: 4 },
      { country: "India", packageCount: 4 },
      { country: "United States", packageCount: 3 },
      { country: "Egypt", packageCount: 3 },
      { country: "South Africa", packageCount: 3 },
      { country: "United Arab Emirates", packageCount: 1 },
    ];

    const countries = chartData.map((item) => item.country);
    const packageCounts = chartData.map((item) => item.packageCount);

    const createChart = () => {
      if (chartRef.current) {
        chartInstance = new Chart(chartRef.current, {
          type: "bar",
          data: {
            labels: countries,
            datasets: [
              {
                label: "Packages per Country",
                data: packageCounts,
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
                  color: "#ffffff", // Tailwind gray-500 for labels
                },
              },
              x: {
                ticks: {
                  color: "#ffffff", // Tailwind gray-500 for labels
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: "#6b7280", // Tailwind gray-600 for legend
                },
              },
            },
          },
        });
      }
    };

    createChart();

    // Cleanup function to destroy the chart instance on component unmount or when the chart is recreated
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Packages per Country</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CountryPackageChart;
