import { useState } from "react";
import Dropdown from "./Dropdown";
import BrandList from "./BrandList";
import ModelList from "./ModelList";

const NestedDropdown = ({ options, title, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  const handleModelSelect = (brand, model) => {
    setSelectedOption(`${brand} - ${model}`);
    setIsOpen(false);
    setSelectedBrand(null);
    onSelect(`${brand} - ${model}`);
  };

  return (
    <Dropdown
      selectedOption={selectedOption}
      onToggle={() => setIsOpen(!isOpen)}
    >
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {selectedBrand ? (
            <ModelList
              models={
                options.find((brand) => brand.name === selectedBrand).models
              }
              onModelSelect={(model) => handleModelSelect(selectedBrand, model)}
              onBack={() => setSelectedBrand(null)}
            />
          ) : (
            <BrandList brands={options} onBrandSelect={handleBrandSelect} />
          )}
        </div>
      )}
    </Dropdown>
  );
};

export default NestedDropdown;
