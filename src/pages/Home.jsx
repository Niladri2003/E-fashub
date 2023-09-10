import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { productData } from "../data";
const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  console.log("Hello");

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

  return (
    <div className="flex">
      {/* Sidebar (visible on large screens) */}
      <aside className="hidden lg:block w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        {/* Price Filter */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="price"
          >
            Price Range:
          </label>
          <select id="price" className="w-full px-3 py-2 border rounded-md">
            {/* Add price range options here */}
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
          </select>
        </div>
        {/* Color Filter */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="color"
          >
            Color:
          </label>
          <select id="color" className="w-full px-3 py-2 border rounded-md">
            {/* Add color options here */}
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </select>
        </div>
        {/* Add more filters as needed */}
      </aside>

      {/* Main content (products) */}
      <div className="w-3/4 overflow-y-auto max-h-[100vh]">
        {loading ? (
          <Spinner />
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl pl-2 lg:p-2 md:p-2 mx-auto min-h-[80vh] justify-center sm:mx-auto">
            {/* {posts.map((post) => (
              <Product key={post.id} post={post} />
            ))} */}
            {products.map((post) => (
              <Product key={post.id} post={post} />
            ))}
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
