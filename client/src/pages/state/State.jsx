import React, { useState } from "react"; // Import useState
import Layout from "../../components/Layout";
import search from "../../assets/search.png";
import StateGrid from "../../grids/StateGrid";
import state from "../../assets/state.png";
import { Link } from "react-router-dom";

const State = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  return (
    <main className="w-full p-2">
      <nav className="flex flex-col lg:flex-row justify-start items-center w-full gap-6 lg:gap-0">
        {/* State Icon and Title */}
        <div className="flex justify-center items-center gap-2 lg:gap-4">
          <img
            src={state}
            alt="State Icon"
            className="w-6 h-6 lg:w-auto lg:h-auto"
          />
          <span className="text-lg lg:text-2xl font-bold">State</span>
        </div>

        {/* Input field with search image in the background */}
        <div className="relative w-full lg:w-[534px] mt-4 lg:mt-0 ml-0 lg:ml-[10%]">
          <input
            type="text"
            className="border-[#9D9D9D] border-[1px] pl-10 py-2 rounded-lg focus:outline-none focus:border-[#662671] w-full"
            placeholder="Search State"
            value={searchQuery} // Set the value to searchQuery
            onChange={(e) => setSearchQuery(e.target.value)} // Update the searchQuery state as the user types
          />
          <img
            src={search}
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5"
          />
        </div>

        {/* Add New Button */}
        <button className="text-white text-sm lg:text-lg bg-[#662671] rounded-lg px-3 py-2 mt-4 lg:mt-0 lg:ml-[14%] w-full lg:w-auto">
          <Link to="/addState">Add New</Link>
        </button>
      </nav>
      <StateGrid searchQuery={searchQuery} /> {/* Pass searchQuery to StateGrid */}
    </main>
  );
};

export default State;
