import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";

type DropdownProps = {
  options: string[];
  placeholder?: string;
  containerClassName?: string;
  isOpen: boolean;
  setStateFunc: (isOpen: boolean) => void;
};

const Dropdown = ({
  options,
  placeholder,
  containerClassName,
  isOpen,
  setStateFunc,
}: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setStateFunc(false); // Close the dropdown after selecting an option
  };

  return (
    <div
      className={`relative inline-block text-left text-nowrap ${containerClassName}`}
    >
      <div>
        <button
          type="button"
          className={`inline-flex justify-between w-full rounded-md border-2 border-gray-300 
            px-4 py-2 bg-white text-sm text-gray-700 
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              selectedOption === "" ? "text-black/60" : ""
            }`}
          onClick={() => setStateFunc(!isOpen)}
        >
          {selectedOption || placeholder || "Select an option"}

          <GoChevronDown
            size={12}
            color="black"
            className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right max-h-[20vh] overflow-y-auto mt-1 z-10 absolute right-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
