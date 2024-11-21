import { useState } from "react";
import { NavLink } from "react-router-dom";

const cars = [
  {
    id: 1,
    name: "Toyota Hatchback",
    image: "https://placehold.co/600x400",
    category: "Medium Car",
    seats: 4,
    transmission: "manual",
    price: 2500,
  },
  {
    id: 2,
    name: "McLaren Sports",
    image: "https://placehold.co/600x400",
    category: "Medium Car",
    seats: 2,
    transmission: "Automatic",
    price: 4500,
  },
  {
    id: 3,
    name: "McLaren GT",
    image: "https://placehold.co/600x400",
    category: "Medium Car",
    seats: 2,
    transmission: "Automatic",
    price: 5000,
  },
  {
    id: 4,
    name: "Ferrari GT",
    image: "https://placehold.co/600x400",
    category: "Medium Car",
    seats: 2,
    transmission: "Automatic",
    price: 5000,
  },
  {
    id: 5,
    name: "Chevrolet Camaro",
    image: "https://placehold.co/600x400",
    category: "Medium Car",
    seats: 2,
    transmission: "Manual",
    price: 2500,
  },
  {
    id: 6,
    name: "Ford Mustang",
    image: "https://placehold.co/600x400",
    category: "Medium Car",
    seats: 2,
    transmission: "Manual",
    price: 2500,
  },
];

const CarCard = ({ car, onClick }) => (
  <div
    className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
    onClick={onClick}
  >
    <img alt={car.name} className="h-48 w-full object-cover" src={car.image} />
    <div className="p-4">
      <div className="space-y-1 text-sm">
        <p>Unit Model: {car.name}</p>
        <p>Category: {car.category}</p>
        <p>Seat/s: {car.seats} people</p>
        <p>Transmission: {car.transmission}</p>
        <p className="font-semibold">PHP {car.price.toLocaleString()} / DAY</p>
      </div>
    </div>
  </div>
);

const Post = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredReservations = cars.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (car) => {
    setSelectedCar(car);
    const modal = document.getElementById("car_modal");
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setSelectedCar(null);
    const modal = document.getElementById("car_modal");
    if (modal) modal.close();
  };

  const addModal = () => {
    const modal = document.getElementById("add_modal");
    if (modal) modal.showModal();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar bg-base-100 font-mono p-5 relative">
        <div className="flex-1">
          <img src="logo.png" alt="logo" className="w-14 h-14" />
          <p className="btn btn-ghost text-2xl">Geo-Rent</p>
        </div>
        <div className="flex-none">
          <label
            className="btn btn-circle swap swap-rotate"
            onClick={toggleDropdown}
          >
            {!isOpen ? (
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            ) : (
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            )}
          </label>
          {isOpen && (
            <div className="absolute top-16 right-5 bg-base-100 rounded-lg shadow-lg p-3 z-50 border">
              <ul className="menu menu-compact space-y-3">
                <NavLink to="/reserve">
                  <li className="text-lg">Reservation List</li>
                </NavLink>
                <NavLink to="/transaction">
                  <li className="text-lg">Transaction History</li>
                </NavLink>
                <NavLink to="/post">
                  <li className="text-lg">Unit Posted</li>
                </NavLink>
                <NavLink to="/profile">
                  <li className="text-lg">User Profile</li>
                </NavLink>
              </ul>
            </div>
          )}
        </div>
      </div>
      <hr />

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen font-mono">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <label className="input input-bordered flex items-center gap-2 shadow-md">
              <input
                type="text"
                className="grow"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <button
            className="flex items-center rounded-lg btn btn-primary font-bold text-white"
            onClick={addModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReservations.map((car) => (
            <CarCard key={car.id} car={car} onClick={() => openModal(car)} />
          ))}
        </div>
      </div>

      <dialog id="add_modal" className="modal font-mono">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-xl font-bold mt-3">| PROVIDE CAR DETAILS</h3>
          <div className="mt-4">
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow text-gray-600"
                placeholder="Category"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow text-gray-600"
                placeholder="Seats"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow text-gray-600"
                placeholder="Transmission"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow text-gray-600"
                placeholder="Price"
              />
            </label>
            <input
              type="file"
              className="file-input file-input-bordered grow w-full sm:w-auto max-w-full mb-2"
            />
          </div>
          <div className="mt-5">
            <button className="btn btn-primary w-full font-bold text-white">
              Confirm
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="car_modal" className="modal font-mono">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          {selectedCar && (
            <>
              <h3 className="text-xl font-bold mt-3">| {selectedCar.name}</h3>
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-48 object-cover rounded mt-4"
              />
              <div className="mt-4 space-y-2">
                <label className="input input-bordered flex items-center gap-2">
                  Category:
                  <input
                    type="text"
                    className="grow"
                    placeholder={selectedCar.category}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Seats:
                  <input
                    type="text"
                    className="grow"
                    placeholder={selectedCar.seats}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Transmission:
                  <input
                    type="text"
                    className="grow"
                    placeholder={selectedCar.transmission}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Price:
                  <input
                    type="text"
                    className="grow"
                    placeholder={selectedCar.price.toLocaleString()}
                  />
                </label>
              </div>
              <div className="flex justify-center mt-5 gap-3">
                <button className="btn btn-error w-1/2 text-white font-bold">
                  Delete
                </button>
                <button className="btn btn-primary w-1/2 text-white font-bold">
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default Post;
