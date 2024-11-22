import { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import supabase from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("customer");
  const [password, showPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  

  const [customer_name, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  const [image_link, setImageLink] = useState(null);
  const [seller_name, setSellerName] = useState('');
  const [email_seller, setEmailSeller] = useState('');
  const [pass_seller, setPassSeller] = useState('');

const handleRegister = () => {
  if(userType === 'customer'){
     register_customer();
    }
    else{
      register_seller();
    }
  }

  const register_customer = async () => {
    const { data, error } = await supabase
      .from('Customer')
      .insert([
        {
        customer_name,
        email,
        password: pass,
        },
      ])
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      console.log('Data inserted successfully:', data);
      alert('Register Successful');
      navigate("/");
    }
  };

  
  const register_seller = async () => {
    const { data, error } = await supabase
      .from('Seller')
      .insert([
        {
        seller_name,
        email: email_seller,
        password: pass_seller,
        image_link
        },
      ])
    if (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    } else {
      console.log('Data inserted successfully:', data);
      alert('Register Successful');
      navigate("/");
    }
  };


  const handleImage = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("images")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setImageLink(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };
  const renderCustomerForm = () => (
    <div className="space-y-3 text-black">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Customer Name"
        value={customer_name}
        onChange={(e) => setCustomerName(e.target.value)} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow" placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type={password ? "text" : "password"}
          className="grow"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
    </div>
  );

  const renderSellerForm = () => (
    <div className="space-y-3 text-black">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" className="grow" placeholder="Seller Name" 
         value={seller_name}
         onChange={(e) => setSellerName(e.target.value)}/>
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow" placeholder="Email address" 
         value={email_seller}
         onChange={(e) => setEmailSeller(e.target.value)}/>
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type={password ? "text" : "password"}
          className="grow"
          placeholder="Password"
          value={pass_seller}
          onChange={(e) => setPassSeller(e.target.value)}
        />
      </label>
      <div>
  {image_link === null ? (
    <p className="text-red-500">No image uploaded</p>
  ) : (
    <p className="text-green-500">Image is uploaded</p>
  )}
  <input
    type="file"
    className="file-input file-input-bordered grow w-full sm:w-auto max-w-full"
    onChange={handleImage}
  />
</div>
      
    </div>
  );

  return (
    <>
      <div
        className="hero min-h-screen font-mono"
        style={{
          backgroundImage: "url(bg-car.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="card glass">
            <div className="card-body">
              <img
                src="logo.png"
                alt="logo"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              />
              <div className="flex justify-center mb-6 gap-4">
                <button
                  className={`px-4 py-2 font-medium ${
                    userType === "customer"
                      ? "bg-blue-600 text-white rounded"
                      : "text-white"
                  }`}
                  onClick={() => setUserType("customer")}
                >
                  <FaBuilding className="inline mr-2" /> Customer
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    userType === "seller"
                      ? "bg-blue-600 text-white rounded"
                      : "text-white"
                  }`}
                  onClick={() => setUserType("seller")}
                >
                  <FaUser className="inline mr-2" /> Seller
                </button>
              </div>
              {userType === "customer"
                ? renderCustomerForm()
                : renderSellerForm()}
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  onChange={() => showPassword(!password)}
                  className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Show Password
              </label>
              <button
                onClick={handleRegister}
                className="w-full px-4 py-3 btn bg-blue-600 border-blue-600 hover:bg-blue-600 text-white rounded-md shadow-sm font-bold"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
              <div className="divider before:bg-white after:bg-white">or</div>
              <NavLink to="/">
                <button className="w-full py-3 font-bold text-white bg-green-600 border-green-600 hover:bg-green-500 btn rounded-lg">
                  Already have an account
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
