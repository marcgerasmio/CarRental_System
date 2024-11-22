import supabase from "../supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();

const [pickup_date, setPickUpDate] = useState('');
const [return_date, setReturnDate] = useState('');
const seller_name = sessionStorage.getItem("seller");
const customer_name = sessionStorage.getItem("name");
const car_name = sessionStorage.getItem("carname");
const id = sessionStorage.getItem("id");


const add_booking = async () => {
  const { data, error } = await supabase
    .from('Booking')
    .insert([
      {
      seller_name,
      customer_name,
      car_name,
      pickup_date,
      return_date,
      status : 'Active'
      },
    ])
update_car();
};


const update_car = async () => {
  try {
    const { error } = await supabase
      .from("Cars")
      .update({
       status: 'Not Available'
      })
      .eq("id", id);
    if (error) throw error;
   navigate("/payment");
  } catch (error) {
    alert("Error updating profile.");
    console.error("Error during update:", error.message);
  }
};



  return (
    <>
      <div className="hero min-h-screen font-mono">
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center">
          <div className="card glass">
            <div className="card-body">
              <img
                src="logo.png"
                alt="logo"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              />
              <hr />
                <p className="text-xl mb-4 font-bold text-white">
                  Booking Schedule
                </p>
                <label className="input input-bordered flex items-center gap-2 mb-2"
                >
                  Pick-up Date:
                  <input type="date" className="grow" placeholder="Daisy"  onChange={(e) => setPickUpDate(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Return Date:
                  <input type="date" className="grow" placeholder="Daisy"  onChange={(e) => setReturnDate(e.target.value)}/>
                </label>
                <button className="mt-6 w-full py-3 font-bold text-white btn bg-blue-600 border-blue-600 hover:bg-blue-600 rounded-lg"
                onClick={add_booking}>
                  Proceed to Payment
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
