import CarCard from "./CarCard.jsx";

const CarList = ({ cars }) => {
  return (
    <div className="mt-4 mb-2">
      {cars && cars.length > 0 ? (
        cars.map((car, index) => <CarCard key={index} car={car} />) // Render each car card
      ) : (
        <p className="text-center text-gray-500">No cars available</p>
      )}
    </div>
  );
};

export default CarList;
