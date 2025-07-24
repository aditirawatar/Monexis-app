import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { auth } from "../../firebase";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      alert("Error logging out");
    }
  };

  const linkClasses = (path) => {
    const isActive = location.pathname === path;
    return `mb-4 p-2 rounded transition ${
      isActive
        ? "border border-blue-500 text-blue-400 bg-transparent shadow-lg shadow-blue-500/50"
        : "hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/50"
    }`;
  };

  return (
    <>
      {/* Move toggle button slightly lower */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-blue-400 bg-gray-800 p-1 rounded shadow hover:shadow-blue-500/50"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>

      <div
        className={`fixed md:static top-0 left-0 min-h-screen bg-gray-800 text-white flex flex-col p-4 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 hover:shadow-lg hover:shadow-blue-500/50`}
      >
        <Link to="/" className="text-2xl font-bold pt-7 mb-6 text-blue-400">
           Home
        </Link>

        <Link to="/dashboard" className={linkClasses("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/transactions" className={linkClasses("/transactions")}>
          Transactions
        </Link>

        <Link to="/analysis" className={linkClasses("/analysis")}>
          Financial Analysis
        </Link>

       
        <div className="flex-1"></div>

        <button
  onClick={handleLogout}
  className="relative group p-2 rounded border border-red-400 text-red-400 overflow-hidden z-10"
>
  <span className="relative z-10">Logout</span>
  <span
    className="absolute left-0 top-0 h-full w-0 bg-red-600 opacity-20 group-hover:w-full transition-all duration-500 ease-out z-0"
  ></span>
</button>

      </div>
    </>
  );
};

export default Sidebar;
