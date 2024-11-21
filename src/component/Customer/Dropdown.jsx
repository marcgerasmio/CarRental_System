import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ children, selectedOption, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-3 py-3 bg-gray-100 rounded-md text-sm font-medium text-gray-700"
      >
        <span className="truncate">{selectedOption}</span>
        <FaChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
      </button>
      {children}
    </div>
  );
};

export default Dropdown;
