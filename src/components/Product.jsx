import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import { AiFillStar } from "react-icons/ai";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  return (
    <div
      className="flex flex-col items-center lg:justify-between 
    transition duration-300 ease-in lg:gap-3 p-4 lg:mt-10 lg:ml-5 ml-2 mr-4 mb-2 mt-2 rounded-xl  bg-white"
    >
      <div className="">
        <p className="text-gray-700 font-semibold lg:text-lg lg:text-left truncate  lg:w-40 mt-1 lg:p-0 ">
          {post.title}
        </p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[180px]">
        <img src={post.images[0]} className="h-full w-full " />
      </div>

      <div className="flex flex-col justify-between lg:gap-6 items-center w-full mt-5">
        <div className="flex flex-row justify-around w-full">
          <div className="flex flow-row gap-2">
            <del className="text-green-600 font-semibold">
              ₹{post.actual_price}
            </del>
            <p className="text-green-600 font-semibold">
              ₹{post.selling_price}
            </p>
          </div>
          <div className="flex items-center">
            <p>{post.average_rating} </p>
            <AiFillStar />
          </div>
        </div>
        {cart.some((p) => p._id == post._id) ? (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in w-full lg:h-12 h-10"
            onClick={removeFromCart}
          >
            Remove Item
          </button>
        ) : (
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
          text-[12px] p-1 px-3 uppercase 
          hover:bg-gray-700
          hover:text-white transition duration-300 ease-in w-full lg:h-12 h-10"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
