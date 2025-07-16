import { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <Link
        to="/"
        className="absolute top-4 left-4 hover:border hover:border-white py-1 px-1 text-blue-200 hover:shadow-lg hover:shadow-blue-500/50 rounded font-semibold "
      >
        ← Home
      </Link>

      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-300 mb-6">Login</h2>
        <input
          className="w-full mb-4 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded mb-3 hover:outline-2 hover:outline-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition"
        >
          Login
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-black text-white py-3 rounded hover:outline-2 hover:outline-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition"
        >
          Continue with Google
        </button>
        <p className="text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
