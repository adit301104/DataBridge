import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbWorldWww } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../Redux/appSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.appSlice);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between mx-3 h-16 bg-gray-400 shadow-md rounded-b-md p-2"
    >
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-4"
      >
        
        {/* <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <GiHamburgerMenu size={"20px"} />
        </motion.div> */}

        {/* Logo */}
        <motion.div
  initial={{ rotate: -20, scale: 0.8 }}
  animate={{ rotate: 0, scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 10 }}
  className="w-8 flex items-center justify-center"
>
  <TbWorldWww size={32} className="text-gray-950" />
</motion.div>

        {/* Hide "DataBridge" on mobile screens */}
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="font-mono text-2xl text-gray-950 font-bold hidden sm:block" // Hide on mobile
        >
          DataBridge
        </motion.h1>
      </motion.div>

      {/* Search Bar (Visible on Desktop and Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex-1 mx-2 md:mx-4 lg:mx-10"
      >
        <motion.div
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="flex items-center bg-blue-950 px-2 py-1.5 md:px-3 md:py-2 rounded-full shadow-md"
        >
          <IoSearch size={"20px"} className="text-white" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Data"
            className="font-mono text-white rounded-full w-full placeholder-white bg-transparent outline-none px-2 text-sm md:text-base"
          />
        </motion.div>
      </motion.div>

      {/* Right Section (Visible on Desktop and Mobile) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-1 md:gap-2"
      >
        {[
          { icon: <FaQuestion size={18} className="md:w-5 md:h-5" /> },
          { icon: <IoMdSettings size={18} className="md:w-5 md:h-5" /> },
          { icon: <TbGridDots size={18} className="md:w-5 md:h-5" /> },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="cursor-pointer relative"
        >
          <Avatar
            onClick={() => setToggle(!toggle)}
            src={user?.photoURL || ""}
            name={user?.displayName || "Guest"}
            size="36px"
            round={true}
          />
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 z-20 shadow-lg bg-white rounded-md mt-2"
              >
                <p
                  onClick={signOutHandler}
                  className="underline p-2 hover:bg-gray-100 cursor-pointer text-sm md:text-base"
                >
                  LogOut
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Mobile Menu (Visible on Mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-gray-400 shadow-lg md:hidden z-40"
          >
            <div className="flex flex-col p-4 gap-4">
              {/* Icons for Mobile */}
              <div className="flex items-center justify-around">
                {[
                  { icon: <FaQuestion size={20} /> },
                  { icon: <IoMdSettings size={20} /> },
                  { icon: <TbGridDots size={20} /> },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full hover:bg-gray-100 cursor-pointer"
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>

              {/* Avatar for Mobile */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="cursor-pointer relative flex justify-center"
              >
                <Avatar
                  onClick={() => setToggle(!toggle)}
                  src={user?.photoURL || ""}
                  name={user?.displayName || "Guest"}
                  size="40px"
                  round={true}
                />
                <AnimatePresence>
                  {toggle && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 z-20 shadow-lg bg-white rounded-md mt-2"
                    >
                      <p
                        onClick={signOutHandler}
                        className="underline p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        LogOut
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;