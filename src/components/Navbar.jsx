import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Group 240.png";

const Navbar = () => {
  const { cart } = useSelector((state) => state);

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center lg:h-16 lg:ml-16 lg:mr-24 mx-auto h-16">
        <NavLink to="/">
          <div className="ml-5 flex flex-row items-center gap-3">
            <img src={Logo} className="h-14 rounded-lg" alt="Logo" />
            <p className="lg:text-2xl font-[500] text-white">E-FashHub</p>
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-white mr-5 space-x-6">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl text-white" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex
                justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
