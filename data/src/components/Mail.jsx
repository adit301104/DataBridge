import React from "react";
import { motion } from "framer-motion";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore instance

const Mail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedEmail } = useSelector((store) => store.appSlice);

  const deleteMailById = async () => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, "emails", id)); // Delete from Firestore
      navigate("/"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-white rounded-xl sm:mx-5 shadow-lg w-full max-w-5xl mx-auto mt-16 sm:mt-0"
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2">
        {/* Left-side Icons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center gap-2 text-gray-700"
        >
          {[
            { icon: <IoMdArrowBack size={20} />, action: () => navigate("/") },
            { icon: <BiArchiveIn size={20} />, action: null },
            { icon: <MdOutlineReport size={20} />, action: null },
            { icon: <MdDeleteOutline size={20} />, action: deleteMailById },
            { icon: <MdOutlineMarkEmailUnread size={20} />, action: null },
            { icon: <MdOutlineWatchLater size={20} />, action: null },
            { icon: <MdOutlineAddTask size={20} />, action: null },
            { icon: <MdOutlineDriveFileMove size={20} />, action: null },
            { icon: <IoMdMore size={20} />, action: null },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              onClick={item.action}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="hover:rounded-full hover:bg-gray-100 p-2"
          >
            <MdKeyboardArrowLeft size={24} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="hover:rounded-full hover:bg-gray-100 p-2"
          >
            <MdKeyboardArrowRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* Email Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="h-[80vh] overflow-y-auto p-4"
      >
        {/* Email Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-lg sm:text-xl">{selectedEmail?.subject}</h1>
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-sm bg-gray-200 rounded-md px-2 py-1"
            >
              Inbox
            </motion.span>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-0">
            <p>
              {selectedEmail?.createdAt
                ? new Date(selectedEmail.createdAt.seconds * 1000).toUTCString()
                : ""}
            </p>
          </div>
        </div>

        {/* Sender Info */}
        <div className="text-gray-500 text-sm mt-2">
          <h1 className="font-medium">{selectedEmail?.to}</h1>
          <span className="text-xs">to me</span>
        </div>

        {/* Email Message */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="my-6 text-gray-700 text-sm leading-relaxed"
        >
          <p>{selectedEmail?.message || "No message available"}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Mail;