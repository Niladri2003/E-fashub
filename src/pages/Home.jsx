import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { productData } from "../data";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  console.log("Hello");
  let subCategory = [];
  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    } catch (error) {
      console.log("Error aagya ji");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
    setProducts(productData);
  }, []);
  console.log(products);
  subCategory = [
    ...new Set(productData.map((product) => product.sub_category)),
  ];
  console.log(subCategory);

  return (
    <div className="flex">
      {/* Sidebar (visible on large screens) */}
      <aside className="hidden lg:block w-1/4 bg-gray-200 p-4">
        <Sidebar />
        {/* Add more filters as needed */}
      </aside>

      {/* Main content (products) */}
      <div className="w-3/4 overflow-y-auto max-h-[100vh]">
        {loading ? (
          <Spinner />
        ) : posts.length > 0 ? (
          <div className="w-full ">
            <div className="p-4 gap-5 flex flex-row items-center">
              <p>Recommended</p>
              {subCategory.map((category, idx) => (
                <button
                  className="p-[10px] border-[0.6px] rounded-md"
                  key={idx}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl pl-2 lg:p-2 md:p-2 mx-auto min-h-[80vh] justify-center sm:mx-auto">
              {/* {posts.map((post) => (
              <Product key={post.id} post={post} />
            ))} */}
              {products.map((post) => (
                <Link key={post._id} to={`/product/${post._id}`}>
                  <Product post={post} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p>No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
