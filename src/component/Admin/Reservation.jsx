import { FaCar, FaSortAmountUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const Reservation = () => {
  const name = sessionStorage.getItem("name");
  const [bookingData, setBookingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedData, setSelectedData] = useState([]);
  const [return_date, setReturnDate] = useState('');

  const fetch_booking = async () => {
    try {
      const { error, data } = await supabase
        .from('Booking')
        .select('*')
        .eq('seller_name', name)
        .eq('status', 'Active');

      if (error) throw error;
      setBookingData(data)
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
    }
  };

  const update_booking = async () => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({
         return_date,
        })
        .eq("id", selectedData.id);
      if (error) throw error;
window.location.reload();
    } catch (error) {
      alert("Error updating data.");
      console.error("Error during update:", error.message);
    }
  };

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

  const filteredReservations = bookingData.filter((bookingData) =>
    bookingData.car_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort function based on date
  // const sortedReservations = [...filteredReservations].sort((a, b) => {
  //   const dateA = new Date(
  //     `20${a.date.split("-")[2]}-${a.date.split("-")[0]}-${
  //       a.date.split("-")[1]
  //     }`
  //   );
  //   const dateB = new Date(
  //     `20${b.date.split("-")[2]}-${b.date.split("-")[0]}-${
  //       b.date.split("-")[1]
  //     }`
  //   );
  //   if (sortOrder === "asc") {
  //     return dateA - dateB;
  //   } else {
  //     return dateB - dateA;
  //   }
  // });

  const openModal = (reservation) => {
    setSelectedData(reservation);
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.showModal();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleSort = () => {
  //   setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  // };

  
  useEffect(() => {
    fetch_booking();
  }, []);


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
                <span className="text-yellow-600">{name}</span>
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
            {/* <button
              className="shadow-md flex items-center justify-center w-11 h-11 border rounded bg-white border-gray-300 hover:bg-gray-100"
              onClick={handleSort}
            >
              <FaSortAmountUp className="h-5 w-5 text-gray-700" />
            </button> */}
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
                   Return Date
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900">
                      {reservation.car_name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {reservation.pickup_date}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {reservation.return_date}
                    </td>
                    <td>
                    <button
                    onClick={() => openModal(reservation)} // Pass reservation to openModal
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
          <div className="flex flex-col w-full space-y-1 mt-3">
          <label className="input flex items-center gap-2">
              Customer Name:
              <input
                type="text"
                placeholder={selectedData.customer_name}
                className="rounded w-full input-sm"
                disabled
              />
            </label>
            <label className="input flex items-center gap-2">
              Car Name:
              <input
                type="text"
                placeholder={selectedData.car_name}
                className="rounded w-full input-sm"
                disabled
              />
            </label>
            <label className="input flex items-center gap-2">
              Pickup Date:
              <input
                type="text"
                placeholder={selectedData.pickup_date}
                className="rounded w-full input-sm"
                disabled
              />
            </label>
            <label className="input flex items-center gap-2">
              Return Date:
              <input
                type="text"
                placeholder={selectedData.return_date}
                className="rounded w-full input-sm"
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </label>
          </div>

          <div className="mt-5">
            <button
              className="btn btn-primary w-full text-white font-bold"
             onClick={update_booking}
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
