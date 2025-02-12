import React, { useState } from "react";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Messages from "./Messages";

const mailType = [
  { icon: <MdInbox size={"20px"} />, text: "Primary" },
  { icon: <GiPriceTag size={"20px"} />, text: "Promotions" },
  { icon: <FaUserFriends size={"20px"} />, text: "Social" },
];

const Inbox = () => {
  const [mailTypeSelected, setMailTypeSelected] = useState(0);

  return (
    <div className="flex-1 mx-2 sm:mx-5 bg-white rounded-lg shadow-md mt-16 sm:mt-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2 text-gray-700">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <MdCropSquare size={"20px"} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <FaCaretDown size={"20px"} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <IoMdRefresh size={"20px"} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <IoMdMore size={"20px"} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <p>1-50 of 1000</p>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>

      {/* Mail Tabs */}
      <div className="h-[85vh] overflow-y-auto">
        <div className="flex items-center gap-1 border-b">
          {mailType.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 p-3 text-sm sm:text-base font-medium transition-all w-full sm:w-1/3 justify-center sm:justify-start ${
                mailTypeSelected === index
                  ? "border-b-4 border-blue-800 text-blue-800"
                  : "border-b-transparent text-gray-600"
              } hover:bg-gray-100`}
              onClick={() => setMailTypeSelected(index)}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.text}</span>
            </button>
          ))}
        </div>

        {/* Messages */}
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;