import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiSolidLogOutCircle } from "react-icons/bi";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const name = sessionStorage.getItem("name");
  const [profileData, setProfileData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    opens_at: "",
    tel_number: "",
    longitude: "",
    latitude: "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };


  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from("Seller")
        .update({
          opens_at: editData.opens_at,
          tel_number: editData.tel_number,
          longitude: editData.longitude,
          latitude: editData.latitude,
        })
        .eq("seller_name", name);

      if (error) throw error;
      alert("Profile updated successfully!");
      setIsModalOpen(false);
      fetch_profile(); // Refresh the data
    } catch (error) {
      alert("Error updating profile.");
      console.error("Error during update:", error.message);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetch_profile = async () => {
    try {
      const { error, data } = await supabase
        .from('Seller')
        .select('*')
        .eq('seller_name', name)
        .single();

      if (error) throw error;
      setProfileData(data);
      console.log(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
    }
  };


  const signout = () =>{
    sessionStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    fetch_profile();
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
            src={profileData.image_link}
            alt="QR Code"
            className="w-72 h-48 rounded"
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
                  placeholder={profileData.seller_name}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Opens at :
                <input
                  type="text"
                  className="grow"
                  placeholder={profileData.opens_at}
                  disabled
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                TEL NO. :
                <input type="text" className="grow" placeholder={profileData.tel_number}  disabled/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Longitude :
                <input type="text" className="grow" placeholder={profileData.longitude}   disabled/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Latitude :
                <input type="text" className="grow" placeholder={profileData.latitude} disabled />
              </label>
            </div>
            <div className="flex items-center space-x-3">
            <button
              className="btn btn-primary flex-1"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <button className="btn btn-error text-white font-bold text-lg flex items-center flex-1"
            onClick={signout}>
              <BiSolidLogOutCircle size={20} />
              <span className="ml-2">Sign Out</span>
            </button>
          </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="opens_at"
                value={editData.opens_at}
                onChange={handleEditChange}
                placeholder="Opens At"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="tel_number"
                value={editData.tel_number}
                onChange={handleEditChange}
                placeholder="TEL NO."
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="latitude"
                value={editData.latitude}
                onChange={handleEditChange}
                placeholder="Latitude"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="longitude"
                value={editData.longitude}
                onChange={handleEditChange}
                placeholder="Longitude"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={updateProfile}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
