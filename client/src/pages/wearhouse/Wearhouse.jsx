
import search from "../../assets/search.png";
import WearhouseGrid from "../../grids/WearhouseGrid";
import city from "../../assets/city.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Wearhouse = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  return (
      <main className="w-full p-2">
        <nav className="flex flex-col lg:flex-row justify-start items-center w-full gap-6 lg:gap-0">
          {/* State Icon and Title */}
          <div className="flex justify-center items-center gap-2 lg:gap-4">
            <img
              src={city}
              alt="State Icon"
              className="w-6 h-6 lg:w-auto lg:h-auto"
            />
            <span className="text-lg lg:text-2xl font-bold">Wearhouse</span>
          </div>

          {/* Input field with search image in the background */}
          <div className="relative w-full lg:w-[534px] mt-4 lg:mt-0 ml-0 lg:ml-[10%]">
            <input
              type="text"
              className="border-[#9D9D9D] border-[1px] pl-10 py-2 rounded-lg focus:outline-none focus:border-[#662671] w-full"
              placeholder="Search wearhouse"
              value={searchQuery} // Set the value to searchQuery
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <img
              src={search}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5"
            />
          </div>

          {/* Add New Button */}
          <button className="text-white text-sm lg:text-lg bg-[#662671] rounded-lg px-3 py-2 mt-4 lg:mt-0 lg:ml-[8%] w-full lg:w-auto">
            <Link to='/addWearhouse'>Add New</Link>
          </button>
        </nav>
        <WearhouseGrid  searchQuery={searchQuery}/>
      </main>
  );
};

export default Wearhouse;
