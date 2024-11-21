import { FaCar, FaSortAmountUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Reservation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const reservations = [
    { car: "Mustang", date: "1-01-24", time: "8:00 AM" },
    { car: "F-150", date: "1-02-24", time: "8:00 AM" },
    { car: "Explorer", date: "1-03-24", time: "8:00 AM" },
    { car: "Escape", date: "1-04-24", time: "8:00 AM" },
    { car: "Fusion", date: "1-05-24", time: "8:00 AM" },
    { car: "Bronco", date: "1-06-24", time: "8:00 AM" },
    { car: "Edge", date: "1-07-24", time: "8:00 AM" },
    { car: "GT", date: "1-08-24", time: "8:00 AM" },
    { car: "Outlander", date: "1-09-24", time: "8:00 AM" },
  ];

  const filteredReservations = reservations.filter((reservation) =>
    reservation.car.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort function based on date
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    const dateA = new Date(
      `20${a.date.split("-")[2]}-${a.date.split("-")[0]}-${
        a.date.split("-")[1]
      }`
    );
    const dateB = new Date(
      `20${b.date.split("-")[2]}-${b.date.split("-")[0]}-${
        b.date.split("-")[1]
      }`
    );
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const openModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 145.49" />
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
      <div className="p-4 font-mono bg-gray-100 min-h-screen">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaCar className="h-6 w-6 text-gray-700" />
              <h1 className="text-lg font-bold">
                WELCOME SELLER,&nbsp;
                <span className="text-yellow-600">FORD PHILIPPINES</span>
              </h1>
            </div>
          </div>
          <p className="text-gray-600">
            Manage your car rental reservations and schedules
          </p>
        </div>
        <div className="mt-3 font-mono">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <label className="input input-bordered flex items-center gap-2 shadow-md">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search reservations..."
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
              className="shadow-md flex items-center justify-center w-11 h-11 border rounded bg-white border-gray-300 hover:bg-gray-100"
              onClick={handleSort}
            >
              <FaSortAmountUp className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          <div className="overflow-x-auto border rounded-md font-mono shadow-xl">
            <table className="table">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                    Unit Model
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                    Pick-up Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                    Pick-up Time
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedReservations.map((reservation, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {reservation.car}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {reservation.date}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {reservation.time}
                    </td>
                    <td>
                      <button
                        onClick={openModal}
                        className="btn btn-xs btn-primary text-white font-bold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal font-mono">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex justify-between gap-3 mt-5">
            <div className="avatar w-24 h-24 rounded-full overflow-hidden shrink-0">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col w-full space-y-1">
              <input
                type="text"
                placeholder="Marion Jotohot"
                className="rounded w-full input-sm"
                disabled
              />
              <input
                type="text"
                placeholder="+639518149753"
                className="rounded w-full input-sm"
                disabled
              />
              <input
                type="text"
                placeholder="P6 Brgy. Lumbocan Butuan City"
                className="rounded w-full input-sm"
                disabled
              />
            </div>
          </div>

          <div className="mt-5">
            <img
              src="https://placehold.co/600x400"
              alt="car-photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col w-full space-y-1 mt-3">
            <label className="input flex items-center gap-2">
              Car:
              <input
                type="text"
                placeholder="Ford Mustang"
                className="rounded w-full input-sm"
                disabled
              />
            </label>
            <label className="input flex items-center gap-2">
              Category:
              <input
                type="text"
                placeholder="Medium Car"
                className="rounded w-full input-sm"
                disabled
              />
            </label>
            <label className="input flex items-center gap-2">
              Seats:
              <input
                type="text"
                placeholder="5 persons"
                className="rounded w-full input-sm"
                disabled
              />
            </label>
            <label className="input flex items-center gap-2">
              Transmission:
              <input
                type="text"
                placeholder="Manual"
                className="rounded w-full input-sm"
                disabled
              />
            </label>
          </div>

          <div className="mt-5">
            <button
              className="btn btn-primary w-full text-white font-bold"
              onClick={() => {
                const calendarModal = document.getElementById("calendar_modal");
                if (calendarModal) calendarModal.showModal();
              }}
            >
              Extend
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Reservation;
