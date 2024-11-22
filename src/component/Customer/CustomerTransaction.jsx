import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient.jsx";

const CustomerTransaction = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [transaction, setTransactionData] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State for selected transaction
  const [rating, setRating] = useState(""); // State for dropdown rating
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const customer_name = sessionStorage.getItem("name");

  const fetch_transaction = async () => {
    try {
      const { error, data } = await supabase
        .from("Booking")
        .select("*")
        .eq("customer_name", customer_name);

      if (error) throw error;
      setTransactionData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const update_booking = async (transaction) => {
    try {
      const { error } = await supabase
        .from("Booking")
        .update({
          status: "Completed",
          rating,
        })
        .eq("id", transaction.id);
      if (error) throw error;
      update_car(transaction);
    } catch (error) {
      alert("Error updating profile.");
      console.error("Error during update:", error.message);
    }
  };

  const update_car = async (transaction) => {
    try {
      const { error } = await supabase
        .from("Cars")
        .update({
          status: "Available",
        })
        .eq("car_name", transaction.car_name);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert("Error updating profile.");
      console.error("Error during update:", error.message);
    }
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
    setRating(""); // Reset rating
  };

  useEffect(() => {
    fetch_transaction();
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md p-4 z-20 relative font-mono">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <img src="logo.png" alt="Logo" className="h-14 w-14" />

          {/* Hamburger Section */}
          <div className="relative-dropdown-container flex-none ml-auto">
            <label
              className="btn btn-circle swap swap-rotate"
              onClick={() => setIsOpen(!isOpen)}
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
              <div className="absolute top-16 right-0 bg-base-100 rounded-lg shadow-lg p-3 z-50 border">
                <ul className="menu menu-compact space-y-3">
                  <NavLink to="/dashboard">
                    <li className="text-lg">Dashboard</li>
                  </NavLink>
                  <NavLink to="/History">
                    <li className="text-lg">Transaction History</li>
                  </NavLink>
                  <NavLink to="/">
                    <li className="text-lg">Sign Out</li>
                  </NavLink>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      <hr />

      {/* Main Content */}
      <div className="p-4 font-mono bg-gray-100 min-h-screen">
        <div className="text-center p-2">
          <p className="text-gray-600"></p>
        </div>
        <div className="mt-3 font-mono">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <label className="input input-bordered flex items-center gap-2 shadow-md">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search transaction..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto shadow-xl border rounded-md font-mono">
            <table className="table">
              <thead className="bg-white">
                <tr>
                  <th>Unit Model</th>
                  <th>Book Date</th>
                  <th>Return Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transaction
                  .filter((t) =>
                    t.car_name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((transaction, index) => (
                    <tr key={index} className="bg-white">
                      <td>{transaction.car_name}</td>
                      <td>{transaction.pickup_date}</td>
                      <td>{transaction.return_date}</td>
                      <td>
                      <button
                    className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
                      transaction.status === "Completed"
                        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
                    }`}
                    disabled={transaction.status === "Completed"}
                    onClick={() => openModal(transaction)}
                  >
                    Return
                    </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md modal-box">
            <h2 className="text-lg font-bold mb-4">Transaction Details</h2>
            <p>Car: {selectedTransaction.car_name}</p>
            <p>Book Date: {selectedTransaction.pickup_date}</p>
            <p>Return Date: {selectedTransaction.return_date}</p>
            <label className="block mt-4">
              Rating:
              <select
                className="block w-full mt-2 border rounded-md p-2"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="" disabled>
                  Select a rating
                </option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </label>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => {
                  update_booking(selectedTransaction);
                  closeModal();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTransaction;
