const BrandList = ({ brands, onBrandSelect }) => (
  <ul>
    {brands.map((brand) => (
      <li
        key={brand.name}
        onClick={() => onBrandSelect(brand.name)}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        {brand.name}
      </li>
    ))}
  </ul>
);

export default BrandList;
