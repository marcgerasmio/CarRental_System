import CarList from "./CarList.jsx";

const Modal = ({ cars }) => {
  return (
    <dialog id="carModal" className="modal font-mono">
      <div className="modal-box relative max-w-4xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="mb-5">
          <p className="text-lg font-bold">Ford Philippines</p>
          <p>J C Aquino Ave, Butuan City, 8600</p>
          <p>Opens at 8:00AM - 6PM MON - FRI</p>
          <p>09518149753</p>
        </div>
        <hr />
        <CarList cars={cars} />
      </div>
    </dialog>
  );
};

export default Modal;
