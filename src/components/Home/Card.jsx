import { Link } from "react-router";

const Card = ({ plant }) => {
  const { _id, name, image, quantity, price, category } = plant || {};
  return (
    <Link
      to={`/plant/${_id}`}
      className="col-span-1 cursor-pointer group card bg-base-100 shadow-xl p-3 rounded-xl border border-base-300 hover:bg-base-200 hover:border-primary transition"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
        >
          <img
            className="
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              "
            src={image}
            alt="Plant Image"
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          ></div>
        </div>
        <div className="card-body p-0">
          <div className="font-semibold text-lg text-base-content">{name}</div>
          <div className="font-semibold text-lg text-base-content">
            Category: {category}
          </div>
          <div className="font-semibold text-lg text-base-content">
            Quantity: {quantity}
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold text-primary"> Price: {price}$</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
