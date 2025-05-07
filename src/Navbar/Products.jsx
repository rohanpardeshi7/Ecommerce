import React, { useEffect, useState } from "react";
import axios from "axios";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function Products() {
  const [productItem, setProductItem] = useState([]);
  const [categoryItem, setCategoryItem] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [sorting, setSorting] = useState(null);
  const [brandItem, setBrandItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categorieFillter, setCategorieFilter] = useState([]);
  const [brandFillter, setBrandFilter] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false); // 👉 NEW STATE


  const getProduct = () => {
    setIsLoading(true);
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          page: currentPage,
          limit: 12,
          categories: categorieFillter.join(","),
          brands: brandFillter.join(","),
          sorting,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setProductItem(finalRes.data);
        setTotalPage(finalRes.total_pages);
        setIsLoading(false);
      });
  };

  const getCategory = () => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((res) => res.data)
      .then((finalRes) => {
        setCategoryItem(finalRes.data);
      });
  };

  const getBrand = () => {
    axios
      .get("https://wscubetech.co/ecommerce-api/brands.php")
      .then((res) => res.data)
      .then((finalRes) => {
        setBrandItem(finalRes.data);
      });
  };

  const getMyCetagory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategorieFilter([...categorieFillter, value]);
    } else {
      setCategorieFilter(categorieFillter.filter((v) => v !== value));
    }
  };

  const getMyBrand = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrandFilter([...brandFillter, value]);
    } else {
      setBrandFilter(brandFillter.filter((v) => v !== value));
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
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4 sm:p-6 bg-gray-50 min-h-screen relative">
      
      {/* 👉 Mobile Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 w-max"
      >
        {showSidebar ? "Hide Filters" : "Show Filters"}
      </button>

      {/* 👉 Sidebar */}
      {(showSidebar || window.innerWidth >= 768) && (
        <aside
          className={`${
            showSidebar ? "absolute z-30 top-20 left-4 right-4 bg-white" : "hidden md:block"
          } md:relative p-5 rounded-xl shadow-md md:shadow-none`}
        >
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-700 mb-3">Categories</h2>
            <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {categoryItem.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    value={item.slug}
                    onChange={getMyCetagory}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="cursor-pointer hover:text-purple-700">
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
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
                  <label className="cursor-pointer hover:text-purple-700">
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main>
        {/* Header with sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
          <h1 className="font-bold text-2xl">Products</h1>
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
            >
              Recommendation
              <svg
                className="w-2.5 h-2.5 ms-2"
                fill="none"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
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
            {dropdown && (
              <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <ul className="py-1 text-sm text-gray-700">
                  {[
                    ["Name: A to Z", 1],
                    ["Name: Z to A", 2],
                    ["Price: Low to High", 3],
                    ["Price: High to Low", 4],
                    ["Discount: Low to High", 5],
                    ["Discount: High to Low", 6],
                    ["Rating: Low to High", 7],
                    ["Rating: High to Low", 8],
                  ].map(([label, value]) => (
                    <li
                      key={value}
                      onClick={() => {
                        setSorting(value);
                        setDropdown(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
              </div>
            ))
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
      </main>
    </div>
  );
}

function ProductItem({ pdata }) {
  const { image, price, brand_name, rating, name } = pdata;

  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-[180px] object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{name}</h2>
      <p className="text-red-700 font-bold text-md mb-1">Rs. {price}</p>
      <p className="text-sm text-gray-500 mb-3">Brand: {brand_name}</p>

      <div className="flex justify-between items-center">
        <div className="text-yellow-500 text-lg">★★★★☆ {rating}</div>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Add
        </button>
      </div>
    </div>
  );
}
