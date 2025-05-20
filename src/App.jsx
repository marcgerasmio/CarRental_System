import { Routes, Route } from "react-router-dom";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Dashboard from "./component/Customer/Dashboard.jsx";
import Reservation from "./component/Admin/Reservation.jsx";
import Transaction from "./component/Admin/Transaction.jsx";
import Post from "./component/Admin/Post.jsx";
import Profile from "./component/Admin/Profile.jsx";
import Booking from "./component/Customer/Booking.jsx";
import PaymentForm from "./component/Customer/PaymentForm.jsx";
import CustomerTransaction from "./component/Customer/CustomerTransaction.jsx";
import AdminMap from "./component/Admin/AdminMap.jsx";
import LocationTracker from "./component/LocationTracker.jsx";
import Reports from "./component/Admin/Reports.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reserve" element={<Reservation />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/payment" element={<PaymentForm />} />
      <Route path="/history" element={<CustomerTransaction />} />
      <Route path="/admin-map" element={<AdminMap />} />
      <Route path="/location" element={<LocationTracker />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default App;
