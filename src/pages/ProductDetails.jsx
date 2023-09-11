import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productData } from "../data";
import Product from "../components/Product";
import { useDispatch } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();
  const product = productData.find((p) => p._id === productId);
  const subCat = product.sub_category;
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  console.log(product);

  const filteredProducts = productData.filter(
    (product) => product.sub_category === subCat
  );
  console.log(filteredProducts);

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product._id));
    toast.error("Item removed from Cart");
  };
  return (
    <div className="flex lg:flex-col flex-col lg:justify-between lg:items-center  max-w-7xl mx-auto mt-20">
      <div className="flex w-full lg:flex-row flex-col lg:items-center items-center ">
        {/* Image section */}
        <div className="lg:w-[50%] flex lg:gap-10  justify-around lg:p-0 p-3">
          <div className="lg:w-[20%] w-[20%] flex flex-col gap-4  ">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className=" p-2 justify-center items-center"
                onClick={() => handleImageClick(img)}
              >
                <img src={img} />
              </div>
            ))}
          </div>
          <div className="w-[80%]">
            <img className="w-[400px]" src={selectedImage} />
          </div>
        </div>
        {/* Product Details Section */}
        <div className="lg:w-[50%] gap-4 flex flex-col lg:p-0 p-5">
          <p className="lg:text-[42px] font-bold w-full">{product.title}</p>
          <p className="text-[24px] text-[#9F9F9F] font-[500]">
            ₹ {product.selling_price}
          </p>
          <p>Average Rating {product.average_rating}</p>
          <p className="text-[13px] font-[400] lg:w-[75%]">
            {product.description}
          </p>

          <div className="flex flex-row gap-4">
            <button
              className="lg:w-[215px] lg:h-[64px] rounded-[15px] border-[1px] border-black hover:bg-green-600 hover:text-white p-2"
              onClick={addToCart}
            >
              Add To Cart
            </button>
            <Link to={"/cart"}>
              <button
                className="lg:w-[215px] lg:h-[64px] rounded-[15px] border-[1px] border-black hover:bg-green-600 hover:text-white p-2"
                onClick={addToCart}
              >
                Buy Now
              </button>
            </Link>
          </div>
          <div className="w-full h-[1px] bg-[#D9D9D9] mt-10"></div>
          <div>
            <p className="text-[#9F9F9F] text-[14px] font-[400] ">
              {" "}
              Category: {product.sub_category}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#D9D9D9] mt-10"></div>
      <div className="flex mt-5 mb-5  w-full justify-center">
        <p className="lg:text-4xl text-2xl text-center">Related Products</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl pl-2 lg:p-2 md:p-2 mx-auto min-h-[80vh] justify-center sm:mx-auto">
        {filteredProducts.map((post) => (
          <div key={post._id} className="shadow-md ">
            <Link to={`/product/${post._id}`}>
              <Product post={post} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
