import React, { useState, useEffect } from 'react';

const LocationTracker = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setError(null);
          },
          (err) => {
            setError('Location access denied or unavailable.');
            console.error(err);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };
    fetchLocation();
    const interval = setInterval(fetchLocation, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded w-fit bg-gray-100 shadow">
      <h2 className="text-lg font-semibold mb-2">User Location</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <p>Latitude: {location.lat ?? 'Fetching...'}</p>
          <p>Longitude: {location.lng ?? 'Fetching...'}</p>
        </div>
      )}
    </div>
  );
};

export default LocationTracker;
