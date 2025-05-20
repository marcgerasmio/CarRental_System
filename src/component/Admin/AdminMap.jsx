import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ResizeMap from "./ResizeMap.jsx";
import { NavLink } from "react-router-dom";
import supabase from "../supabaseClient.jsx";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const AdminMap = () => {
  const dealerName = sessionStorage.getItem("name");
  const [sellerData, setSellerData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [carData, setCarData] = useState([]);
  const [SelectedSeller, setSelectedSeller] = useState([]);
  const [rating, setRating] = useState('');
const [selectedCustomer, setSelectedCustomer] = useState([]);
  const customIcon = L.icon({
    iconUrl: markerIcon, 
    shadowUrl: markerShadow,
    iconSize: [25, 41],  
    iconAnchor: [12, 41], 
  });
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const center = { lat: 8.8015, lng: 125.7407 };

  const handleMarkerClick = (seller) => {
    setSelectedCustomer(seller);
    const carModal = document.getElementById("carModal");
    carModal.showModal();
  };

  const closeModal = () => {
    const carModal = document.getElementById("carModal");
    carModal.close();
  };

  const fetch_cardata = async (seller_name) => {
    try {
      const { error, data } = await supabase
        .from('Cars')
        .select('*')
        .eq('seller_name', seller_name)
        .eq('status', 'Available');

      if (error) throw error;
      setCarData(data);
    } catch (error) {
      console.error('Error during fetching history:', error.message);
    }
  };

  const fetch_rating = async (seller_name) => {
    try {
      const { data, error } = await supabase
        .from('Booking')
        .select('rating')
        .eq('seller_name', seller_name)
        .neq('rating', 'null');
  
      if (error) throw error;
  
      const ratings = data.map(item => parseInt(item.rating)); 
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
          : 0;
  
      setRating(averageRating);
  
      return { averageRating };
    } catch (error) {
      console.error("Error during fetching ratings:", error.message);
      return null;
    }
  };
  
  const fetch_sellerdata = async (seller_name) => {
    try {
      const { error, data } = await supabase
        .from('Seller')
        .select('*')
        .eq('seller_name', seller_name)
        .single();

      if (error) throw error;
      setSelectedSeller(data);
    } catch (error) {
      console.error('Error during fetching history:', error.message);
    }
  };

  const fetch_sellers = async () => {
    try {
      const { error, data } = await supabase
        .from('Booking')
        .select('*')
        .eq('seller_name', dealerName)
        .eq('status', 'Active');

      if (error) throw error;
      setSellerData(data);
    } catch (error) {
      console.error('Error during fetching history:', error.message);
    }
  };
 


  useEffect(() => {
    fetch_sellers();
  }, []);

  return (
    <div className="flex flex-col h-screen font-mono">
      <nav className="bg-white shadow-md p-4 z-20 relative">
        <div className="flex items-center justify-between">
          <div className="flex-none">
            <img src="logo.png" alt="Logo" className="h-14 w-14" />
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold">Vehicle Tracker</h1>
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
                      <NavLink to="/admin-map">
                        <li className="text-lg">Vehicle Tracker</li>
                      </NavLink>
                      <NavLink to="/reserve">
                        <li className="text-lg">Reservation List</li>
                      </NavLink>
                      <NavLink to="/transaction">
                        <li className="text-lg">Transaction History</li>
                      </NavLink>
                      <NavLink to="/post">
                        <li className="text-lg">Unit Posted</li>
                      </NavLink>
                      <NavLink to="/reports">
                      <li className="text-lg">Financial Reports</li>
                      </NavLink>
                      <NavLink to="/profile">
                        <li className="text-lg">User Profile</li>
                      </NavLink>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex-1 relative z-10">
        <MapContainer
          center={center}
          zoom={10}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <ResizeMap />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Render markers based on sellerData */}
          {sellerData.length > 0 ? (
            sellerData.map((seller, index) => (
              <Marker
                key={index}
                position={{ lat: seller.latitude, lng: seller.longitude }} 
                icon={customIcon} 
                eventHandlers={{
                  click: () => handleMarkerClick(seller)  
                }}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </MapContainer>
      </div>

      {/* Modal for displaying selected marker details */}
      <dialog id="carModal" className="modal">
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Rental Information</h3>
          
          {/* Seller information */}
          {SelectedSeller && (
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg">{selectedCustomer.customer_name}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="text-sm">
                  <span className="font-semibold">Vehicle Name:</span> {selectedCustomer.car_name}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Rent Duration:</span> {selectedCustomer.pickup_date} to {selectedCustomer.return_date}
                </div>
              </div>
            </div>
          )}    
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminMap;