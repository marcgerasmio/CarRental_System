const Booking = () => {
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
              <form className="mt-4">
                <p className="text-xl mb-4 font-bold text-white">
                  Booking Schedule
                </p>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  Pick-up Date:
                  <input type="date" className="grow" placeholder="Daisy" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Return Date:
                  <input type="date" className="grow" placeholder="Daisy" />
                </label>
                <button className="mt-6 w-full py-3 font-bold text-white btn bg-blue-600 border-blue-600 hover:bg-blue-600 rounded-lg">
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
