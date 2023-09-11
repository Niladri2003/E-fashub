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

  const [selectedCategory, setselectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const filteredItems = productData.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setselectedCategory(event.target.value);
    console.log(selectedCategory);
  };
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setselectedCategory(event.target.value);
    //console.log(selectedCategory);
  };

  //-------------------------------------------------
  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    // if (query) {
    //   filteredProducts = filteredItems;
    // }

    //Applying selected filter
    if (selected) {
      if (selected === 1000) {
        filteredProducts = filteredProducts.filter(
          ({ selling_price }) => selling_price > 1000
        );
      } else {
        filteredProducts = filteredProducts.filter(
          ({ sub_category, title, selling_price }) =>
            sub_category === selected ||
            title === selected ||
            (selling_price < selected && selling_price > selected - 300)
        );
      }
    }
    console.log(filteredProducts);

    // return filteredProducts.map(({ post }) => (
    //   <Link key={post._id} to={`/product/${post._id}`}>
    //     <Product post={post} />
    //   </Link>
    // ));
    return filteredProducts;
  }
  const result = filteredData(productData, selectedCategory, query);
  console.log(result);

  let subCategory = [];
  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    } catch (error) {
      console.log("Error");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
    setProducts(productData);
  }, []);
  subCategory = [
    ...new Set(productData.map((product) => product.sub_category)),
  ];

  console.log(subCategory);

  return (
    <div className="flex">
      {/* Sidebar (visible on large screens) */}
      <aside className="hidden lg:block w-1/4 bg-gray-200 p-4">
        <Sidebar handleChange={handleChange} subCategory={subCategory} />
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
                  value={category}
                  onClick={handleClick}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl pl-2 lg:p-2 md:p-2 mx-auto min-h-[80vh] justify-center sm:mx-auto">
              {result.map((post) => (
                <Link key={post._id} to={`/product/${post._id}`}>
                  <Product post={post} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <p>No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
