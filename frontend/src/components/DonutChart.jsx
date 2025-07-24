import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ income, expense, savings }) => {
  const data = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        data: [income, expense, savings],
        backgroundColor: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"],
        borderColor: ["#34d399", "#f87171","#60a5fa" ], // blue, red, green-ish
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="w-64">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#d1d5db", // optional: legend text color for dark backgrounds
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DonutChart;
