import React from "react";
import { FaStar } from "react-icons/fa";
import { MdCropSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedEmail } from "../Redux/appSlice";
import { motion } from "framer-motion";

const Message = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email.id}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.02, boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      onClick={openMail}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 py-3 px-4 text-sm hover:shadow-md hover:cursor-pointer w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Left Icons */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {/* Select Icon */}
        <motion.div className="text-gray-300">
          <MdCropSquare className="w-5 h-5" />
        </motion.div>

        {/* Star Icon (Optional) */}
        {/* <motion.div className="text-gray-300">
          <FaStar className="w-5 h-5" />
        </motion.div> */}
      </div>

      {/* Email Details */}
      <div className="flex-1 w-full sm:w-auto">
        <h1 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
          {email.to}
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-sm">
          {email?.message || "No message"}
        </p>
      </div>

      {/* Email Date */}
      <div className="text-gray-400 text-xs sm:text-sm flex-none">
        <p>
          {email?.createdAt
            ? new Date(email.createdAt).toLocaleString()
            : "Date not available"}
        </p>
      </div>
    </motion.div>
  );
};

export default Message;
