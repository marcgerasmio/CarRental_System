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
          <h3 className="text-xl font-bold">{seller.seller_name}</h3>
          <p>Seller Rating: {rating}</p>
          <p>{seller.opens_at}</p>
          <p>{seller.tel_number}</p>
          <p>{seller.address}</p>
        </div>
        <hr />
        <CarList cars={cars} />
      </div>
    </dialog>
  );
};

export default Modal;
