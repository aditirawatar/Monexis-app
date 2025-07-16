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
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-64">
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChart;
