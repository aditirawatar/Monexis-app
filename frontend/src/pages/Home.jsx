import { Link } from "react-router-dom";

export default function Home() {
  const isLoggedIn = false; // Replace with your actual auth state

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-2xl text-blue-200">
            Monexis <span className="font-light text-xl text-blue-100">- Finance Tracker</span>
          </span>
        </div>
        {!isLoggedIn && (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-200 text-blue-100 rounded-lg transition"
          >
            Login
          </Link>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-200 mb-4">Welcome to Monexis</h1>
          <p className="text-xl text-white max-w-2xl mx-auto mb-8">
            Simplify your finances with powerful tools for tracking, predicting, and managing your money.
          </p>
          <div>
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-200 text-white rounded-lg  transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-200 text-white rounded-lg transition"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-3 text-blue-200">Expense Tracking</h2>
            <p className="text-blue-100">Track your daily expenses and understand where your money goes.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-3 text-blue-200">Budget Planning</h2>
            <p className="text-blue-100">Create and manage budgets to achieve your financial goals.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-3 text-blue-200">Financial Insights</h2>
            <p className="text-blue-100">Get valuable insights into your spending habits and financial health.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
