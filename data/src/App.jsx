import React, { useState, useEffect } from "react"; // Import React and hooks
import "./App.css"; // Import your CSS file
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Mail from "./components/Mail";
import Inbox from "./components/Inbox";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SendMail from "./components/SendMail";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "/mail/:id",
        element: <Mail />,
      },
    ],
  },
]);

function App() {
  const { user } = useSelector((store) => store.appSlice);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-600 min-h-screen">
      <AnimatePresence>
        {isLoading ? (
          // Loading Screen with Logo Animation
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
              className="text-center"
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
              >
                DataBridge
              </motion.h1>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-lg md:text-xl text-gray-400"
              >
                A Secure Way to Connect
              </motion.p>
            </motion.div>
          </motion.div>
        ) : (
          // Main App Content
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {!user ? (
              <Login />
            ) : (
              <>
                <NavBar />
                <RouterProvider router={router} />
                <div className="fixed bottom-0 right-0 w-full md:w-[30%] lg:w-[25%] p-4 md:p-0 z-10">
                  <SendMail />
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;