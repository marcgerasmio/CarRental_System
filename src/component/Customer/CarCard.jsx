const CarCard = ({ car }) => (
  <div className="card p-4 bg-gray-50 border rounded-lg shadow-lg mb-5">
    <div className="h-48 bg-gray-200 mb-4">
      <img
        alt="car"
        className="w-full object-cover"
        src="https://placehold.co/600x400"
      />
    </div>
    <h4 className="text-lg font-semibold text-gray-800">{car.model}</h4>
    <ul className="mt-2 text-sm text-gray-600">
      <li>Category: {car.category}</li>
      <li>Seats: {car.seats}</li>
      <li>Transmission: {car.transmission}</li>
      <li>Price: PHP {car.price} / DAY</li>
    </ul>
    <button className="btn btn-primary mt-5">Rent</button>
  </div>
);

export default CarCard;
