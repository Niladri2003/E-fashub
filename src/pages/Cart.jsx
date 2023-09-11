import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  console.log("Printing Cart");
  console.log(cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, curr) => acc + parseFloat(curr.selling_price), 0)
    );
  }, [cart]);

  return (
    <div className="flex w-full justify-center items-start bg-[#F9F1E7] h-screen">
      <div className="flex justify-center items-center  flex-col  lg:w-3/4 mt-10">
        {cart.length > 0 ? (
          <div className="flex justify-center lg:items-start items-center w-full lg:gap-4 lg:flex-row flex-col ">
            <div className="lg:w-[75%] w-full lg:p-0 p-2 rounded-md">
              {cart.map((item, index) => {
                return <CartItem key={item.id} item={item} itemIndex={index} />;
              })}
            </div>

            <div className="lg:w-[25%] w-[93%] p-4  border-[1px] lg:p-4 bg-[#d8c2a8] rounded-md lg:h-72 flex flex-col justify-between gap-3 ">
              <div className="flex flex-col lg:gap-4 gap-5">
                <div className="text-center">Your Cart</div>
                <div className="h-[1px] bg-black"></div>
                <div>Summary</div>
                <div className="flex flex-row justify-between">
                  <p>Total Items:</p>
                  <p className="lg:mr-8"> {cart.length}</p>
                </div>
              </div>
              <div className="h-[1px] bg-black"></div>
              <div className="flex flex-row justify-between">
                <p>Total Amount: </p>
                <p>₹{totalAmount}</p>
              </div>
              <div className="h-[1px] bg-black"></div>

              <div className="w-full flex items-center justify-center">
                <button className="p-2 rounded-md  hover:shadow-md bg-[#2db8b8]">
                  CheckOut Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <h1>Cart Empty</h1>
            <Link to={"/"}>
              <button>Shop Now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
