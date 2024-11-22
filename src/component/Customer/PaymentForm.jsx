import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openSuccessModal = () => setIsSuccessModalOpen(true);

  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const redirect = () => {
navigate("/history");
  }

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

              {/* Currency Display */}
              <div className="text-center mb-3 mt-5">
                <p className="text-xl font-semibold text-white">
                 ENTER PAYMENT DETAILS
                </p>
              </div>

              <form>
                <div className="mb-2">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    className="input input-bordered w-full"
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    className="input input-bordered w-full"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="account_number"
                    placeholder="Account number"
                    className="input input-bordered w-full"
                    required
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn btn-primary w-full text-white font-bold"
                  >
                    Send Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 font-mono"
          onClick={closeModal}
        >
          <div
            className="modal modal-open"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
          >
            <div className="modal-box">
              <h2 className="text-2xl font-semibold text-center mb-3">
                Payment Information
              </h2>
              <hr />

              <div className="space-y-4 mt-6">
                <div className="flex justify-between">
                </div>
                <div className="flex justify-between">
                  <span>Firstname</span>
                  <span>{firstname}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lastname</span>
                  <span>{lastname}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account number</span>
                  <span>{number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email</span>
                  <span>{email}</span>
                </div>
              </div>
              <div className="modal-action justify-between mt-10">
                <button
                  className="btn btn-error text-white font-bold w-1/2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary w-1/2 font-bold text-white"
                  onClick={() => {
                    closeModal();
                    openSuccessModal();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 font-mono"
          onClick={closeSuccessModal}
        >
          <div
            className="modal modal-open"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
          >
            <div className="modal-box">
              <h3 className="text-2xl font-semibold text-center mb-3">
                Payment Successful
              </h3>
              <p className="text-center">
                Your payment has been processed successfully.
              </p>
              <div className="modal-action mt-10">
                <button
                  className="btn btn-primary w-full font-bold"
                  onClick={redirect}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
