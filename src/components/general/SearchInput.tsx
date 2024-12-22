import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <div className="relative flex-1">
      <FaSearch
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
      />
      <input
        type="text"
        className="pl-10 w-full pr-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
