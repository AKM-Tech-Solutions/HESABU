import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <nav className="header bg-gray-400 px-4 py-3 flex justify-between">
      <div className="flex items-center text-xl">
        <span className="text-black font-semibold">
          Dorchester Bar & Restaurant
        </span>
      </div>
      <div className="flex items-center gap-x-5">
        <div className="mt-100 ">
          <span className="relative md:absolute insety-0 left-0 flex items-center pl-2">
            <button className="p-1  focus:outline-none text-white md:text-black cursor-pointer">
              <FaSearch />
            </button>
          </span>
          <input
            type="text"
            className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block mt-52"
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
