import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { NavLink } from 'react-router-dom';

const Reports = () => {
  const sellerName = sessionStorage.getItem("name");
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [weeklyRentals, setWeeklyRentals] = useState(0);
  const [monthlyRentals, setMonthlyRentals] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [carPrice, setCarPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from('Cars')
          .select('car_name')
          .eq('seller_name', sellerName);

        if (error) throw error;

        setCars(data);
        if (data.length > 0) {
          setSelectedCar(data[0].car_name);
        }
      } catch (err) {
        setError('Failed to fetch cars: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (sellerName) fetchCars();
  }, [sellerName]);


  useEffect(() => {
    const fetchRentalStats = async () => {
      if (!selectedCar) return;
    
      setLoading(true);
      try {
        const now = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
    
        const nowStr = now.toISOString();
        const oneWeekAgoStr = oneWeekAgo.toISOString();
        const oneMonthAgoStr = oneMonthAgo.toISOString();
    
        const { count: weeklyCount, error: weeklyError } = await supabase
          .from('Booking')
          .select('id', { count: 'exact' })
          .eq('car_name', selectedCar)
          .gte('created_at', oneWeekAgoStr)
          .lte('created_at', nowStr);
    
        if (weeklyError) throw weeklyError;
        setWeeklyRentals(weeklyCount || 0);
    
        const { count: monthlyCount, error: monthlyError } = await supabase
          .from('Booking')
          .select('id', { count: 'exact' })
          .eq('car_name', selectedCar)
          .gte('created_at', oneMonthAgoStr)
          .lte('created_at', nowStr);
    
        if (monthlyError) throw monthlyError;
        setMonthlyRentals(monthlyCount || 0);
    
        const { data: carData, error: carError } = await supabase
          .from('Cars')
          .select('price')
          .eq('car_name', selectedCar)
          .eq('seller_name', sellerName)
          .single();
    
        if (carError) throw carError;
    
        // Sanitize price by removing commas and parsing it as a float
        const sanitizedPrice = parseFloat(carData.price.replace(/,/g, ''));
        setCarPrice(sanitizedPrice);
    
        const { count: totalBookings, error: totalBookingsError } = await supabase
          .from('Booking')
          .select('id', { count: 'exact' })
          .eq('car_name', selectedCar);
    
        if (totalBookingsError) throw totalBookingsError;
    
        const totalRev = (sanitizedPrice || 0) * (totalBookings || 0);
        setTotalRevenue(totalRev);
    
      } catch (err) {
        setError('Failed to fetch rental statistics: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalStats();
  }, [selectedCar]);

  const handleCarChange = (e) => {
    setSelectedCar(e.target.value);
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div>
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
      {/* REPORT CONTENT */}
      <div className="p-4 font-mono bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Vehicle Rental Statistics</h2>
      <div className="mb-4">
        <label htmlFor="car-select" className="block mb-2 font-medium">
          Select a Vehicle:
        </label>
        <select
          id="car-select"
          value={selectedCar}
          onChange={handleCarChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        >
          {cars.map((car) => (
            <option key={car.car_name} value={car.car_name}>
              {car.car_name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="font-medium text-blue-800">Weekly Rentals</h3>
            <p className="text-2xl font-bold">{weeklyRentals}</p>
          </div>

          <div className="bg-green-50 p-4 rounded shadow">
            <h3 className="font-medium text-green-800">Monthly Rentals</h3>
            <p className="text-2xl font-bold">{monthlyRentals}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded shadow">
            <h3 className="font-medium text-purple-800">Total Revenue</h3>
            <p className="text-2xl font-bold">₱{totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Reports;
