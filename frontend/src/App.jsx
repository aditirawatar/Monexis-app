import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Dashboard/Transaction";
import FinancialAnalysis from "./pages/Dashboard/FinancialAnalysis";
function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/analysis" element={<FinancialAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App
