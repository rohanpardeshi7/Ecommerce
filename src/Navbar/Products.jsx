import React, { useEffect, useState } from "react";
import axios from "axios";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function Products() {
  let [productItem, setProductItem] = useState([]);
  let [categoryItem, setCategoryItem] = useState([]);
  let [dropdown, setDropdown] = useState(false);
  let [sorting, setSorting] = useState(null);
  let [brandItem, setBrandItem] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [categorieFillter, setCategorieFilter] = useState([]);
  let [brandFillter, setBrandFilter] = useState([]);
  let [totalPage, setTotalPage] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);
  let [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle state

  let getProduct = () => {
    setIsLoading(true);
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          page: currentPage,
          limit: 12,
          categories: categorieFillter.join(","),
          brands: brandFillter.join(","),
          sorting: sorting,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setProductItem(finalRes.data);
        setTotalPage(finalRes.total_pages);
        setIsLoading(false);
      });
  };

  let getCategory = () => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((res) => res.data)
      .then((finalRes) => {
        setCategoryItem(finalRes.data);
      });
  };

  let getBrand = () => {
    axios
      .get("https://wscubetech.co/ecommerce-api/brands.php")
      .then((res) => res.data)
      .then((finalRes) => {
        setBrandItem(finalRes.data);
      });
  };

  let getMyCetagory = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      if (!categorieFillter.includes(value)) {
        setCategorieFilter([...categorieFillter, value]);
      }
    } else {
      let finalData = categorieFillter.filter((v) => v !== value);
      setCategorieFilter(finalData);
    }
  };

  let getMyBrand = (e) => {
    let { value, checked } = e.target;
    if (checked) {
      if (!brandFillter.includes(value)) {
        setBrandFilter([...brandFillter, value]);
      }
    } else {
      let finalData = brandFillter.filter((v) => v !== value);
      setBrandFilter(finalData);
    }
  };

  useEffect(() => {
    getCategory();
    getBrand();
  }, []);

  useEffect(() => {
    getProduct();
  }, [sorting, categorieFillter, brandFillter, currentPage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[20%_80%] gap-6 p-6 bg-gray-50 min-h-screen relative">
      {/* Sidebar */}
      <div
        className={`bg-white p-5 rounded-xl shadow-md absolute md:static z-30 transition-transform duration-300
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block w-[75%] max-w-xs md:w-full h-full md:h-auto overflow-y-auto`}
      >
        {/* Category List */}
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-3">
            Categories
          </h2>
          <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {categoryItem.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={item.slug}
                  onChange={getMyCetagory}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="cursor-pointer hover:text-purple-700">{item.name}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand List */}
        <div>
          <h2 className="text-md font-semibold text-gray-700 mb-3">Brands</h2>
          <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {brandItem.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={item.slug}
                  onChange={getMyBrand}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="cursor-pointer hover:text-purple-700">{item.name}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Section */}
      <div>
        <div className="flex flex-col md:flex-row justify-between mb-5 gap-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Products</h1>

            {/* Toggle Sidebar Button (Mobile only) */}
            <button
              className="md:hidden ml-4 text-white bg-blue-600 px-4 py-2 rounded-lg"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            >
              Recommendation
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div
              className={`absolute lg-right-0  sm-right-0 mt-2 z-10 bg-white rounded-lg shadow-lg w-44 divide-y divide-gray-100 ${
                dropdown ? "block" : "hidden"
              }`}
            >
              <ul className="py-2 text-sm text-gray-700">
                {[
                  { text: "Name : A to Z", val: 1 },
                  { text: "Name : Z to A", val: 2 },
                  { text: "Price : Low to High", val: 3 },
                  { text: "Price : High to Low", val: 4 },
                  { text: "Discount : Low to High", val: 5 },
                  { text: "Discount : High to Low", val: 6 },
                  { text: "Rating : Low to High", val: 7 },
                  { text: "Rating : High to Low", val: 8 },
                ].map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSorting(item.val);
                      setDropdown(false);
                    }}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
              <div className="h-4 bg-gray-300 mb-6 rounded"></div>
              <div className="h-4 bg-gray-200 mb-6 rounded"></div>
              <div className="h-4 bg-gray-300 mb-6 rounded"></div>
              <div className="h-4 bg-gray-200 mb-6 rounded"></div>
            </div>
          ) : (
            productItem.map((item, i) => <ProductItem key={i} pdata={item} />)
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <ResponsivePagination
            current={currentPage}
            total={totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

// Product Card
function ProductItem({ pdata }) {
  let { image, price, brand_name, rating, name } = pdata;

  return (
    <div className="max-w-[250px] bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-[180px] object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{name}</h2>
      <p className="text-red-700 font-bold text-md mb-1">Rs.{price}</p>
      <p className="text-sm text-gray-500 mb-3">Brand: {brand_name}</p>

      <div className="flex justify-between items-center">
        <div className="text-yellow-500 text-lg">★ {rating}</div>
        <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
          Add
        </button>
      </div>
    </div>
  );
}
