import { FaChevronLeft } from "react-icons/fa";

const ModelList = ({ models, onModelSelect, onBack }) => (
  <div>
    <button
      onClick={onBack}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      <FaChevronLeft className="w-4 h-4 mr-2" />
      Back to brands
    </button>
    <ul>
      {models.map((model) => (
        <li
          key={model}
          onClick={() => onModelSelect(model)}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {model}
        </li>
      ))}
    </ul>
  </div>
);

export default ModelList;
