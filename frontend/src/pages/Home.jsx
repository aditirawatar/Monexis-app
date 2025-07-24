import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import Typed from "typed.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [startLogoTransition, setStartLogoTransition] = useState(false);
  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: ["- Finance Tracker"],
      typeSpeed: 90,
      backSpeed: 70,
      showCursor: false,
      onComplete: () => {
        setTimeout(() => setStartLogoTransition(true), 800);
        setTimeout(() => setAnimationComplete(true), 2000);
      },
    });

    return () => {
      typedInstance.current.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 shadow-lg relative z-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 overflow-hidden"
        >
          <motion.span
            className="font-semibold text-2xl text-blue-200 hover:cursor-pointer"
            initial={{ scale: 0.5, x: 0, y: 0 }}
            animate={
              startLogoTransition
                ? {
                    scale: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 1, ease: "easeInOut" },
                  }
                : {}
            }
          >
            Monexis{" "}
            <span className="font-light text-xl text-blue-100">
              - Finance Tracker
            </span>
          </motion.span>
        </motion.div>

        {!isLoggedIn && animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link
  to="/login"
  className="glow-btn px-4 py-2 text-blue-200 border border-blue-500 rounded-md transition"
>
  Login
</Link>

          </motion.div>
        )}
      </header>

      {/* Initial Splash Heading */}
      {!animationComplete && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-blue-200 drop-shadow-xl"
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={
              startLogoTransition
                ? {
                    scale: 0.5,
                    y: "-50vh",
                    x: 0,
                    transition: { duration: 1.5, ease: "easeInOut" },
                  }
                : {}
            }
          >
            Monexis{" "}
            <span
              ref={typedRef}
              className="text-3xl font-light text-blue-100 drop-shadow-md"
            ></span>
          </motion.h1>
        </motion.div>
      )}

      {/* Main Content */}
      <AnimatePresence>
        {animationComplete && (
          <motion.main
            className="flex-grow flex flex-col justify-center items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-blue-200 mb-4">
                Welcome to Monexis
              </h1>
              <p className="text-xl text-white max-w-2xl mx-auto mb-8">
                Simplify your finances with powerful tools for tracking, predicting,
                and managing your money.
              </p>
              <div>
                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-blue-600 text-blue-200 rounded-lg transition"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="relative inline-block px-6 py-3 border border-blue-400 text-blue-400 font-medium rounded-md overflow-hidden transition-colors duration-500 group"
                  >
                    <span className="absolute inset-0 bg-blue-400 w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></span>
                    <span className="relative z-10 group-hover:text-white">
                      Get Started
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Glow Feature Cards */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 hover:cursor-pointer">
              {[
                {
                  title: "Expense Tracking",
                  desc: "Track your daily expenses and understand where your money goes.",
                },
                {
                  title: "Budget Planning",
                  desc: "Create and manage budgets to achieve your financial goals.",
                },
                {
                  title: "Financial Insights",
                  desc: "Get valuable insights into your spending habits and financial health.",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className="relative group bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden glow-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty("--x", `${x}px`);
                    card.style.setProperty("--y", `${y}px`);
                  }}
                  onTouchMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const touch = e.touches[0];
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    card.style.setProperty("--x", `${x}px`);
                    card.style.setProperty("--y", `${y}px`);
                  }}
                >
                  <h2 className="text-xl font-semibold mb-3 text-blue-200">
                    {card.title}
                  </h2>
                  <p className="text-blue-100">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
