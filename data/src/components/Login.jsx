import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { auth } from "../firebase";
import { provider } from "./../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/appSlice";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Loading state for Google sign-in

  const signInWithGoogle = async () => {
    setIsLoading(true); // Start loading
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      dispatch(
        setUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL, // Corrected property name
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="p-8 bg-gray-600 flex flex-col gap-6 rounded-lg shadow-2xl"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-100 text-3xl font-bold"
        >
          Welcome to DataBridge
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-300 text-lg"
        >
          A Secure Way to Connect
        </motion.p>

        <AnimatePresence>
          {isLoading ? (
            // Skeletal Loading Effect
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <div className="w-48 h-12 bg-gray-500 rounded-full animate-pulse"></div>
            </motion.div>
          ) : (
            // Google Button
            <motion.div
              key="googleButton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center"
            >
              <GoogleButton onClick={signInWithGoogle} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;