import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BiSolidLogOutCircle } from "react-icons/bi";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

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

      <div className="font-mono container mx-auto w-full p-5 space-y-6">
        <div className="flex justify-center content-center">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="QR Code"
            className="w-72 h-72 rounded"
          />
        </div>
        <hr />

        <div className="max-h-screen">
          <div className="overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-10rem)] space-y-3 mb-16">
            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                Seller :
                <input
                  type="text"
                  className="grow"
                  placeholder="Ford Philippines"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Opens at :
                <input
                  type="text"
                  className="grow"
                  placeholder="8:00am-6:00am MON-SAT"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                TEL NO. :
                <input type="text" className="grow" placeholder="54321" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Longhitude :
                <input type="text" className="grow" placeholder="54321" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Latitude :
                <input type="text" className="grow" placeholder="54321" />
              </label>
            </div>
            <button className="w-full btn btn-error text-white font-bold text-lg">
              <BiSolidLogOutCircle size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
