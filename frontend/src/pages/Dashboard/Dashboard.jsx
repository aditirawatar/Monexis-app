import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaidLinkButton from "../../components/PlaidLinkButton";
import Sidebar from "./SideBar";
import DonutChart from "../../components/DonutChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions on mount
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

  const income = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const expenses = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const savings = Math.max(income - expenses, 0);

  const recentTxns = transactions.slice(0, 7);

  return (
    <div className="flex bg-gray-900  text-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mt-7 text-blue-300 mb-4">Dashboard</h2>
        <PlaidLinkButton onTransactionsFetched={setTransactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-600 p-4 rounded shadow text-white">
            <h4 className="font-semibold">Income</h4>
            <p>${income.toFixed(2)}</p>
          </div>
          <div className="bg-red-600 p-4 rounded shadow text-white">
            <h4 className="font-semibold">Expenses</h4>
            <p>${expenses.toFixed(2)}</p>
          </div>
          <div className="bg-blue-600 p-4 rounded shadow text-white">
            <h4 className="font-semibold">Savings</h4>
            <p>${savings.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Donut Chart */}
          <div className="flex-1 bg-gray-800 p-4 rounded shadow flex items-center justify-center">
            <DonutChart income={income} expense={expenses} savings={savings} />
          </div>

          {/* Transactions */}
          <div className="flex-1 bg-gray-800 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-300">Recent Transactions:</h3>
            {recentTxns.length === 0 ? (
              <p className="text-gray-400">No transactions yet. Connect your bank to see sandbox data.</p>
            ) : (
              <ul className="space-y-2">
                {recentTxns.map((txn) => (
                  <li
                    key={txn.transaction_id}
                    className="border border-gray-700 p-2 rounded flex justify-between items-center"
                  >
                    <span>{txn.name}</span>
                    <span>${txn.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
