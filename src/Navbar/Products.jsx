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

  let getProduct = () => {
    setIsLoading(true);
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          page: currentPage,
          limit: 12,
          categories: categorieFillter.join(","),
          brands: brandFillter.join(","),
          price_from: "",
          price_to: "",
          discount_from: "",
          discount_to: "",
          rating: null,
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
    <div className="grid grid-cols-[20%_80%] gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        {/* Category List 1 */}
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-3">
            Categories
          </h2>
          <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {categoryItem.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
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

        {/* Category List 2 */}
        <div>
          <h2 className="text-md font-semibold text-gray-700 mb-3">Brands</h2>
          <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {brandItem.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
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
        <div>
          <h2 className="text-md font-semibold text-gray-700 my-5">Price</h2>
          <ul className="space-y-2 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <li className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" />RS.10 to 50</li>
              
          </ul>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-5">
          <div>
            <h1 className="font-bold text-2xl">Products</h1>
          </div>
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              onClick={() => setDropdown(!dropdown)}
              class="cursor-pointer text-white relative bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Recommendation{" "}
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4 z-10"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div
              id="dropdown"
              class={`z-10  absolute ${
                dropdown ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li
                  onClick={() => {
                    setSorting(1);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Name : A to Z
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(2);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Name : Z to A
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(3);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price : Low to High
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(4);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Price : High to Low
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(5);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Discount : Low to High
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(6);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Discount : High to Low
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(7);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Rating : Low to Hogh
                  </a>
                </li>
                <li
                  onClick={() => {
                    setSorting(8);
                    setDropdown(false);
                  }}
                >
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Rating : High to Low
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Card Section */}
        <div>
          <div className="grid grid-cols-4 gap-6">
            {isLoading ? (
              <div class="animate-pulse">
                <div class="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
                <div class="h-4 bg-gray-300 mb-6 rounded"></div>
                <div class="h-4 bg-gray-200 mb-6 rounded"></div>
                <div class="h-4 bg-gray-300 mb-6 rounded"></div>
                <div class="h-4 bg-gray-200 mb-6 rounded"></div>
              </div>
            ) : (
              productItem.map((item, i) => <ProductItem key={i} pdata={item} />)
            )}
          </div>
        </div>
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
function ProductItem({ pdata }) {
  let { id, title, image, price, brand_name, rating, name } = pdata;
  return (
    <div className="max-w-[250px] bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-4">
      <img
        src={image}
        alt="Essence Mascara"
        className="w-full h-[180px] object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{name}</h2>
      <p className="text-red-700 font-bold text-md mb-1">Rs.{price}</p>
      <p className="text-sm text-gray-500 mb-3">Brand: {brand_name}</p>

      <div className="flex justify-between items-center">
        <div className="text-yellow-500 text-lg">★★★★☆{rating}</div>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </div>
    </div>
  );
}
