import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();
  console.log(item);
  const removeFromCart = () => {
    dispatch(remove(item._id));
    toast.success("Item Removed");
  };

  return (
    <div className="w-full bg-white p-2 ">
      <div className="flex flex-row justify-around w-full lg:gap-6 gap-12">
        <div className="w-[25%] flex items-center lg:justify-center justify-around">
          <img src={item.images[0]} className="" />
        </div>
        <div className="w-[75%] flex flex-col gap-2">
          <h1 className="font-bold lg:text-xl">{item.title}</h1>
          <p className="text-[#9F9F9F]"> seller:{item.seller}</p>
          <div className="flex justify-start gap-3  flex-row items-center">
            <del className="lg:text-lg text-[#9F9F9F]">
              ₹{item.actual_price}
            </del>
            <p className="text-black text-xl font-[500]">
              ₹{item.selling_price}
            </p>
            <p className="text-green-600 ">{item.discount}</p>
          </div>
          <div
            onClick={removeFromCart}
            className="flex gap-3 items-center mt-3 cursor-pointer"
          >
            <p className="font-[600]">REMOVE</p>
            <AiFillDelete />
          </div>
        </div>
      </div>
      <div className="h-[1px] mt-2 bg-slate-100"></div>
    </div>
  );
};

export default CartItem;
