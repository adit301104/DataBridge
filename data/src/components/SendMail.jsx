import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../Redux/appSlice";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

const SendEmail = ({ isSidebarOpen }) => {
  const [formData, setFormData] = useState({
    recipients: "",
    subject: "",
    message: "",
  });
  const { open } = useSelector((store) => store.appSlice);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "emails"), {
      to: formData.recipients,
      subject: formData.subject,
      message: formData.message,
      createdAt: serverTimestamp(),
    });
    dispatch(setOpen(false));
    setFormData({
      recipients: "",
      subject: "",
      message: "",
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-4 rounded-lg shadow-xl shadow-slate-600 ${
              isSidebarOpen ? "ml-64 md:ml-72 lg:ml-80" : "ml-0"
            }`}
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex px-4 py-3 bg-[#F2F6FC] items-center justify-between rounded-t-lg"
            >
              <h1 className="text-sm sm:text-base md:text-lg font-medium">New Message</h1>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(setOpen(false))}
                className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              >
                <RxCross2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onSubmit={submitHandler}
              className="flex flex-col p-4 gap-3"
            >
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                onChange={changeEventHandler}
                name="recipients"
                value={formData.recipients}
                type="text"
                placeholder="Recipients"
                className="outline-none py-2 text-sm sm:text-base border-b border-gray-200 focus:border-blue-500"
              />
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                onChange={changeEventHandler}
                name="subject"
                value={formData.subject}
                type="text"
                placeholder="Subject"
                className="outline-none py-2 text-sm sm:text-base border-b border-gray-200 focus:border-blue-500"
              />
              <motion.textarea
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                onChange={changeEventHandler}
                name="message"
                value={formData.message}
                placeholder="Message"
                rows="6"
                className="outline-none py-2 text-sm sm:text-base border-b border-gray-200 focus:border-blue-500 resize-none"
              ></motion.textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#0B57D0] rounded-full w-fit px-5 py-2 text-white text-sm sm:text-base font-medium mt-3 hover:bg-[#0a4eb5] transition-colors"
              >
                Send
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendEmail;