import CarList from "./CarList.jsx";

const Modal = ({ cars, seller, rating }) => {
  return (
    <dialog id="carModal" className="modal font-mono">
      <div className="modal-box relative max-w-4xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="mb-5">
          <p className="text-lg font-bold">{seller.seller_name}</p>
          <p>Seller Rating: {rating}</p>
          <p>{seller.opens_at}</p>
          <p>{seller.tel_number}</p>
        </div>
        <hr />
        <CarList cars={cars} />
      </div>
    </dialog>
  );
};

export default Modal;
