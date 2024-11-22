import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ResizeMap from "./ResizeMap.jsx";
import NestedDropdown from "./NestedDropdown.jsx";
import Modal from "./Modal.jsx";
import { NavLink } from "react-router-dom";
import supabase from "../supabaseClient.jsx";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const Dashboard = () => {
  const [sellerData, setSellerData] = useState([]);
  const [filtersellerData, setFilterSellerData] = useState([]);
  const [selectedModel, setSelectedModel] = useState("Select Model");
  const [isOpen, setIsOpen] = useState(false);
  const [carData, setCarData] = useState([]);
  const [SelectedSeller, setSelectedSeller] = useState([]);

  const customIcon = L.icon({
    iconUrl: markerIcon, // Replace with your custom marker image path if applicable
    shadowUrl: markerShadow,
    iconSize: [25, 41],  // Size of the icon
    iconAnchor: [12, 41], // Position the marker relative to its point
  });
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const center = { lat: 8.8015, lng: 125.7407 };

  const carOptions = [
    { name: "Ford", models: ["Fiesta", "Focus", "Mustang", "Explorer"] },
    { name: "Toyota", models: ["Corolla", "Camry", "RAV4", "Prius"] },
    { name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
    { name: "Nissan", models: ["Altima", "Maxima", "Rogue", "Pathfinder"] },
  ];


  const handleMarkerClick = (seller_name) => {
    fetch_cardata(seller_name);
    fetch_sellerdata(seller_name);
    const carModal = document.getElementById("carModal");
    carModal.showModal();
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
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
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
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
    }
  };

  const fetch_sellers = async () => {
    try {
      const { error, data } = await supabase
        .from('Seller')
        .select('*');

      if (error) throw error;
      setSellerData(data);
      console.log(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error('Error during fetching history:', error.message);
    }
  };
 
    
    const handleModelChange = (model) => {
      const secondWord = model.split(" - ")[1];
      search_car(secondWord);
    };

    const search_car = async (secondWord) => {
      try {
        const { error, data } = await supabase
          .from('Cars')
          .select('seller_name')
          .eq('car_name', secondWord);
  
        if (error) throw error;
        filteredSeller(data)
      } catch (error) {
        alert("An unexpected error occurred.");
        console.error('Error during fetching history:', error.message);
      }
    };

    const filteredSeller = async (name) => {
      console.log(name);
      const sellerNames = name.map(item => item.seller_name);
      try {
        const { error, data } = await supabase
          .from('Seller')
          .select('*')
          .in('seller_name', sellerNames); 
    
        if (error) throw error;
        setSellerData(data);
        console.log(data);
      } catch (error) {
        alert("An unexpected error occurred.");
        console.error('Error during fetching sellers:', error.message);
      }
    };

    useEffect(() => {
      fetch_sellers();
    }, []);


  return (
    <div className="flex flex-col h-screen font-mono">
      <nav className="bg-white shadow-md p-4 z-20 relative">
        <div className="flex items-center justify-between">
          <img src="logo.png" alt="Logo" className="h-14 w-14" />
          <div className="w-48 flex gap-3">
            <NestedDropdown
              options={carOptions}
              title="Choose Brand"
              onSelect={(model) => {
                setSelectedModel(model);
                handleModelChange(model); 
              }}
            />
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
                    <NavLink to="/dashboard">
                      <li className="text-lg">Dashboard</li>
                    </NavLink>
                    <NavLink to="/history">
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
                click: () => handleMarkerClick(seller.seller_name)  
              }}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
        </MapContainer>
      </div>

      <Modal cars={carData} seller={SelectedSeller}/>
    </div>
  );
};

export default Dashboard;
