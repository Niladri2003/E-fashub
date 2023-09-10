import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productData } from "../data";
import Product from "../components/Product";
const ProductDetails = () => {
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

  return (
    <div className="flex flex-col justify-between items-center  max-w-7xl mx-auto mt-20">
      <div className="flex w-full ">
        {/* Image section */}
        <div className="w-[50%] flex gap-10 ">
          <div className="w-[20%] flex flex-col gap-4 ">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className="border border-black p-2 justify-center items-center"
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
        <div className="w-[50%] gap-4 flex flex-col">
          <p className="text-[42px]">{product.title}</p>
          <p className="text-[24px] text-[#9F9F9F] font-[500]">
            ₹ {product.selling_price}
          </p>
          <p>Average Rating {product.average_rating}</p>
          <p className="text-[13px] font-[400] w-[75%]">
            {product.description}
          </p>

          <div className="flex flex-row gap-4">
            <button className="w-[215px] h-[64px] rounded-[15px] border-[1px] border-black hover:bg-green-600 hover:text-white">
              Add To Cart
            </button>
            <button className="w-[215px] h-[64px] rounded-[15px] border-[1px] border-black  hover:bg-green-600 hover:text-white">
              Buy Now
            </button>
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
      <div className="flex mt-5 mb-5">
        <p className="text-4xl">Related Products</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl pl-2 lg:p-2 md:p-2 mx-auto min-h-[80vh] justify-center sm:mx-auto">
        {filteredProducts.map((post) => (
          <Link key={post._id} to={`/product/${post._id}`}>
            <Product post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
