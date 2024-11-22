import { useState } from "react";
import { NavLink } from "react-router-dom";
import supabase from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, showPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [userType, setUserType] = useState('customer');

  const handleLogin = async (event) => {
    event.preventDefault();
    if(userType === 'customer'){
      login_customer();
     }
     else{
      login_seller();
     }
  };

  const login_customer = async () => {
    const { data } = await supabase
    .from('Customer')
    .select('*')
    .eq('email', email)
    .single();

    if (data && data.password === pass && data.email === email) {
    const name = data.customer_name;
    sessionStorage.setItem('name', name);
    navigate("/dashboard");
    }
    else {
      alert('Wrong Credentials');
    }
  };

  const login_seller = async () => {
    const { data } = await supabase
    .from('Seller')
    .select('*')
    .eq('email', email)
    .single();

    if (data && data.password === pass && data.email === email) {
    const name = data.seller_name;
    sessionStorage.setItem('name', name);
    navigate("/reserve");
    }
    else {
      alert('Wrong Credentials');
    }
  };

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
              <form onSubmit={handleLogin}>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow text-gray-600"
                    placeholder="Enter an email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={password ? "text" : "password"}
                    className="grow text-gray-600"
                    placeholder="Enter a password"
                    value={pass} onChange={(e) => setPass(e.target.value)}
                  />
                </label>
                <select className="select select-bordered w-full mb-3 text-gray-500"
                 value={userType} onChange={(e) => setUserType(e.target.value)}>
                  <option disabled selected>
                    Login as:
                  </option>
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                </select>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      onChange={() => showPassword(!password)}
                      className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Show Password
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 font-bold text-white btn bg-blue-600 border-blue-600 hover:bg-blue-600 rounded-lg ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <div className="divider before:bg-white after:bg-white">or</div>
              <NavLink to="/register">
                <button className="w-full py-3 font-bold text-white bg-green-600 border-green-600 hover:bg-green-500 rounded-lg btn">
                  Create an Account
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
