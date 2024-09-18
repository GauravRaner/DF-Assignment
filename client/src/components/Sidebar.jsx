import React, { useState } from "react";
import { FaHome, FaBars } from "react-icons/fa";
import { GrCaretNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import state from "../assets/state.png";
import city from "../assets/city.png";
import warehouse from "../assets/Warehouse.png";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="sm:hidden flex justify-start ">
        <FaBars fontSize={30} onClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-30 left-0  bg-[#F4F4F4] w-[300px] text-3xl flex-col gap-10 py-4 px-3 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform sm:translate-x-0 sm:w-[503px] sm:flex sm:static`}
      >
        <Link
          to="/home"
          className={`flex justify-between items-center py-2 px-4 ${activeIndex === 0 ? "bg-[#F4EDAF]" : ""
            }`}
          onClick={() => handleClick(0)}
        >
          <div className="flex justify-between items-center gap-9">
            <FaHome />
            <p>Home</p>
          </div>
          <GrCaretNext fontSize={20} />
        </Link>

        <Link
          to="/state"
          className={`flex justify-between items-center py-2 px-4 ${activeIndex === 1 ? "bg-[#F4EDAF]" : ""
            }`}
          onClick={() => handleClick(1)}
        >
          <div className="flex justify-between items-center gap-9">
            <img src={state} alt="State" />
            <p>State</p>
          </div>
          <GrCaretNext fontSize={20} />
        </Link>

        <Link
          to="/city"
          className={`flex justify-between items-center py-2 px-4 ${activeIndex === 2 ? "bg-[#F4EDAF]" : ""
            }`}
          onClick={() => handleClick(2)}
        >
          <div className="flex justify-between items-center gap-9">
            <img src={city} alt="City" className="h-[60px]" />
            <p>City</p>
          </div>
          <GrCaretNext fontSize={20} />
        </Link>

        <Link
          to="/wearhouse"
          className={`flex justify-between items-center py-2 px-4 ${activeIndex === 3 ? "bg-[#F4EDAF]" : ""
            }`}
          onClick={() => handleClick(3)}
        >
          <div className="flex justify-between items-center gap-9">
            <img src={warehouse} alt="Warehouse" className="h-[65px]" />
            <p>Warehouse</p>
          </div>
          <GrCaretNext fontSize={20} />
        </Link>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
