import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
let [product,setProduct] = useState([])

let getProduct = ()=>{
   axios.get('https://wscubetech.co/ecommerce-api/products.php')
   .then((res)=>  res.data)
   .then((finalRes)=>{
    setProduct(finalRes.data)
   })
}
useEffect(()=>{
  getProduct()
},[])


  return (
    <>
    <div className="max-w-[1220px] m-auto grid grid-cols-[60%_40%] py-[30px] gap-3 mt-[50px]">
        <div>
          <h1 className="font-extrabold text-[60px]">
            The experience makes all the difference.
          </h1>
          <p className="text-[20px] text-[#9483b3]">
            From checkout to global sales tax compliance, companies around the
            world use Flowbite to simplify their payment stack.
          </p>
          <div className="flex gap-3 mt-[30px]">
            <button
              type="button"
              className="focus:outline-none flex items-center gap-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Get Started <FaArrowRight />
            </button>
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Offers
            </button>
          </div>
        </div>

        <div className="w-[100%]">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="Phone Mockup"
          />
        </div>
      </div>
      <div>
      <h1 className="text-center font-bold text-[30px] text-[#1f2937] my-8">
        Shop by category
      </h1>
      </div>
      <div className="max-w-[1220px] mx-auto grid grid-cols-3 gap-3 mb-5">
        <div>
          <img src="https://i.ibb.co/ThPFmzv/omid-armin-m-VSb6-PFk-VXw-unsplash-1-1.png" alt="" />
        </div>
        <div className='grid grid-row-2 gap-10'>
          <div>
            <img src="https://i.ibb.co/SXZvYHs/irene-kredenets-DDqx-X0-7v-KE-unsplash-1.png" alt="" />
          </div>
          <div>
            <img src="https://i.ibb.co/Hd1pVxW/louis-mornaud-Ju-6-TPKXd-Bs-unsplash-1-2.png" alt="" />
          </div>
        </div>
        <div>
            <img src="https://i.ibb.co/PTtRBLL/olive-tatiane-Im-Ez-F9-B91-Mk-unsplash-1.png" alt="" />
          </div>
      </div>
      <div className='w-[100%] grid grid-cols-5 gap-2'>
        {product.map((item,index)=><Product key={index} pdata={item}/>)}
        
      </div>




      </>
  )
}


function Product ({pdata}){
  let { id, title, image , price, brand, rating,name } = pdata
  return(
    <div className="max-w-[250px] bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-4">
      <img
        src={image}
        alt="Essence Mascara"
        className="w-full h-[180px] object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
       {name}
      </h2>
      <p className="text-red-700 font-bold text-md mb-1">Rs.{price}</p>
      <p className="text-sm text-gray-500 mb-3">Brand: {brand}</p>

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
  )
}