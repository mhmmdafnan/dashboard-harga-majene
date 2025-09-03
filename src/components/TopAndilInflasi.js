"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopAndilInflasi({ data }) {
  const chartData = {
    labels: data.map((d) => d.nama),
    datasets: [
      {
        label: "Andil Inflasi",
        data: data.map((d) => d.andil),
        backgroundColor: "#fb923c", // orange-400
        borderColor: "#f97316", // orange-500
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // biar horizontal
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111",
        bodyColor: "#333",
        borderColor: "#f97316", // orange-500
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#e5e7eb", // gray-200
        },
      },
      y: {
        grid: {
          color: "#f3f4f6", // gray-100
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="w-full h-[250px] sm:h-[350px] lg:h-[450px]">
        <Bar
          data={chartData}
          options={{ ...options, maintainAspectRatio: false }}
        />
      </div>
    </>
  );
}
