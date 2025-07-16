import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from "recharts";

const FinancialAnalysis = () => {
  const [transactions, setTransactions] = useState([]);
  const [comparisonMsg, setComparisonMsg] = useState("");
  const [monthComparisonData, setMonthComparisonData] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      try {
       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/plaid/transactions`);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };
    fetchTxns();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      calculateComparison(transactions);
    }
  }, [transactions]);

  const calculateComparison = (txns) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = now.getFullYear();
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentTotal = 0;
    let previousTotal = 0;

    txns.forEach((t) => {
      const txnDate = new Date(t.date);
      if (txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear) {
        if (t.amount > 0) currentTotal += t.amount;
      } else if (txnDate.getMonth() === previousMonth && txnDate.getFullYear() === previousYear) {
        if (t.amount > 0) previousTotal += t.amount;
      }
    });

    setMonthComparisonData([
      { name: "Previous Month", amount: previousTotal },
      { name: "Current Month", amount: currentTotal },
    ]);

    if (currentTotal > previousTotal) {
      setComparisonMsg("⚠️ You spent more this month than last month!");
    } else {
      setComparisonMsg("✅ Good job! You spent less this month than last month!");
    }
  };

  // Example category data
  const barData = [
    { name: "Food", amount: 1200 },
    { name: "Shopping", amount: 800 },
    { name: "Bills", amount: 600 },
    { name: "Entertainment", amount: 400 },
  ];

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-2xl mt-7 font-bold mb-6 text-blue-400">Financial Analysis</h2>

        {/* Line Chart */}
        <div className="bg-gray-800 p-4 rounded-lg mb-8 shadow hover:shadow-lg hover:shadow-blue-500/50 transition">
          <h3 className="text-lg font-semibold mb-4 text-blue-300">Transaction Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactions.slice(0, 7)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#3b82f6" }} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Flex container for two bar charts side by side */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Bar Chart */}
          <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg hover:shadow-blue-500/50 transition">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#3b82f6" }} />
                <Legend />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Month Comparison Bar Chart */}
          <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg hover:shadow-blue-500/50 transition">
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Spending Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#3b82f6" }} />
                <Legend />
                <Bar dataKey="amount" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison message */}
        <div className={`mt-6 text-lg font-semibold ${comparisonMsg.includes("⚠️") ? "text-red-500" : "text-green-500"}`}>
          {comparisonMsg}
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;
