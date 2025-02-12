import React from "react";
import { motion } from "framer-motion";
import { MdDrafts } from "react-icons/md";
import { IoMdAlarm, IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { TbSend2 } from "react-icons/tb";
import { IoArrowDown } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setOpen } from "../Redux/appSlice";

const sidebarItems = [
  { id: "inbox", icon: <IoMdStar size={"24px"} />, text: "Inbox" },

  { id: "snoozed", icon: <IoMdAlarm size={"24px"} />, text: "Snoozed" },
  { id: "sent", icon: <TbSend2 size={"24px"} />, text: "Sent" },
  { id: "drafts", icon: <MdDrafts size={"24px"} />, text: "Drafts" },
  { id: "more", icon: <IoArrowDown size={"24px"} />, text: "More" },
];

const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="w-full md:w-64 lg:w-72 p-2 md:p-4"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Add padding to the top for mobile to avoid overlap with the menu button */}
      <div className="pt-20 sm:pt-0">
        {/* Create Button with Click Effect */}
        <motion.div
          className="p-2 md:p-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <button
            onClick={() => dispatch(setOpen(true))}
            className="font-mono flex items-center gap-2 p-2 md:p-3 rounded-xl hover:shadow-md bg-gray-400 w-full"
          >
            <LuPencil size={"20px"} className="md:w-6 md:h-6" />
            <span className="hidden md:inline">Create</span>
          </button>
        </motion.div>

        {/* Sidebar Items */}
        <div className="mt-4">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="text-white bg-gray-600 rounded-r-full my-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1, // Stagger effect
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.02, backgroundColor: "rgb(107 114 128)" }}
            >
              <div className="flex items-center pl-4 md:pl-5 gap-2 py-1.5 rounded-r-full hover:cursor-pointer font-mono font-medium hover:font-bold hover:bg-gray-500">
                {item.icon}
                <p className="hidden md:inline">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;