import React, { useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import SendMail from "./SendMail"; // Import SendEmail component

const Body = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen pt-16">
      {/* Sidebar (Hidden on mobile, shown on larger screens) */}
      <div
        className={`fixed sm:relative bg-gray-700 shadow-md h-full sm:w-64 md:w-72 lg:w-80 transition-transform duration-300 z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-700 p-4 w-full">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden fixed top-20 left-4 bg-gray-900 text-white p-2 rounded-md shadow-md z-40"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        <Outlet />
      </div>

      {/* SendEmail Component */}
      <SendMail isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Body;