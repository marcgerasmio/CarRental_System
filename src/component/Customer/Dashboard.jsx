import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ResizeMap from "./ResizeMap.jsx";
import NestedDropdown from "./NestedDropdown.jsx";
import Modal from "./Modal.jsx";

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState("Select Model");

  const center = { lat: 8.8015, lng: 125.7407 };

  const carOptions = [
    { name: "Ford", models: ["Fiesta", "Focus", "Mustang", "Explorer"] },
    { name: "Toyota", models: ["Corolla", "Camry", "RAV4", "Prius"] },
    { name: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
    { name: "Nissan", models: ["Altima", "Maxima", "Rogue", "Pathfinder"] },
  ];

  const carData = [
    {
      model: "Toyota Hatchback",
      category: "Medium Car",
      seats: 4,
      transmission: "manual",
      price: 2500,
    },
    {
      model: "Ford Mustang",
      category: "Sports Car",
      seats: 2,
      transmission: "automatic",
      price: 5000,
    },
    {
      model: "Honda Civic",
      category: "Compact Car",
      seats: 5,
      transmission: "manual",
      price: 1800,
    },
    {
      model: "Nissan Altima",
      category: "Sedan",
      seats: 5,
      transmission: "automatic",
      price: 3500,
    },
  ];

  const handleMarkerClick = () => {
    const carModal = document.getElementById("carModal");
    carModal.showModal();
  };

  return (
    <div className="flex flex-col h-screen font-mono">
      <nav className="bg-white shadow-md p-4 z-20 relative">
        <div className="flex items-center justify-between">
          <img src="logo.png" alt="Logo" className="h-14 w-14" />
          <div className="w-48">
            <NestedDropdown
              options={carOptions}
              title="Choose Brand"
              onSelect={setSelectedModel}
            />
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
          <Marker
            position={center}
            eventHandlers={{ click: handleMarkerClick }}
          />
        </MapContainer>
      </div>

      <Modal cars={carData} />
    </div>
  );
};

export default Dashboard;
