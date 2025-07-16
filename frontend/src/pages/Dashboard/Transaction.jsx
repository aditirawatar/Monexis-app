import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/plaid/transactions`);
        setTransactions(res.data.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex bg-gray-900 text-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl mt-7 font-bold text-blue-300 mb-4">All Transactions</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions available. Please connect your bank first.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((txn) => (
              <li
                key={txn.transaction_id}
                className="border border-gray-700 p-3 py-4 rounded flex justify-between items-center hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/50 transition"
              >
                <span>{txn.name}</span>
                <span>${txn.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transaction;
