import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function Home() {
  let [product, setProduct] = useState([]);
  let [totalPage, setTotalPage] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);

  let getProduct = () => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          page: currentPage,
          limit: 20,
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setProduct(finalRes.data);
        setTotalPage(finalRes.total_pages); // Correct pagination source
      });
  };

  useEffect(() => {
    getProduct();
  }, [currentPage]);

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-[1220px] m-auto grid md:grid-cols-2 gap-8 py-10 mt-10 px-4">
        <div className="flex flex-col justify-center">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight">
            The experience makes all the difference.
          </h1>
          <p className="text-lg text-gray-500 mt-4">
            From checkout to global sales tax compliance, companies around the
            world use Flowbite to simplify their payment stack.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition">
              Get Started <FaArrowRight />
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100">
              Offers
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="Phone Mockup"
            className="w-full"
          />
        </div>
      </div>

      {/* Category Banner */}
      <h1 className="text-center font-bold text-3xl text-gray-800 my-12">
        Shop by Category
      </h1>

      {/* Category Images */}
      <div className="max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-10">
        <img
          src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png"
          alt=""
          className="rounded-xl shadow-md w-full h-full object-cover"
        />
        <div className="grid gap-6">
          <img
            src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png"
            alt=""
            className="rounded-xl shadow-md w-full h-full object-cover"
          />
          <img
            src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png"
            alt=""
            className="rounded-xl shadow-md w-full h-full object-cover"
          />
        </div>
        <img
          src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png"
          alt=""
          className="rounded-xl shadow-md w-full h-full object-cover"
        />
      </div>

      {/* Product Grid */}
      <div className="max-w-[1220px] mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Latest Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {product.map((item, index) => (
            <Product key={index} pdata={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <ResponsivePagination
            current={currentPage}
            total={totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

function Product({ pdata }) {
  let { image, price, brand, rating, name } = pdata;
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="font-semibold text-gray-800 text-md truncate mb-1">{name}</h3>
      <p className="text-red-600 font-bold mb-1">Rs. {price}</p>
      <p className="text-sm text-gray-500 mb-2">Brand: {brand}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-yellow-500 font-medium">★ {rating}</span>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs">
          Add
        </button>
      </div>
    </div>
  );
}
