import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();
  const handleRentClick = () => {
    console.log('Selected Car:', car);
    const id = car.id;
    sessionStorage.setItem('id', id)
    const seller = car.seller_name;
    sessionStorage.setItem('seller', seller);
    const carname = car.car_name;
    sessionStorage.setItem('carname', carname);
    const price = car.price;
    sessionStorage.setItem('price', price);
    navigate('/booking');
  };

  return (
    <div className="card p-4 bg-gray-50 border rounded-lg shadow-lg mb-5">
      <div className="h-48 bg-gray-200 mb-4">
        <img
          alt="car"
          className="w-full h-full object-cover"
          src={car.image}
        />
      </div>
      <h4 className="text-lg font-semibold text-gray-800">{car.car_name}</h4>
      <ul className="mt-2 text-sm text-gray-600">
        <li>Category: {car.category}</li>
        <li>Seats: {car.seats}</li>
        <li>Transmission: {car.transmission}</li>
        <li>Price: PHP {car.price} / DAY</li>
      </ul>
      <button className="btn btn-primary mt-5" onClick={handleRentClick}>Rent</button>
    </div>
  );
};

export default CarCard;
