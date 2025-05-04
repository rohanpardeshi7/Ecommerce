import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-[70%_30%] gap-6">
    {/* Left: Cart Products */}
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <span className="text-sm font-semibold text-gray-700">PRODUCT DETAILS</span>
        <div className="flex gap-12 text-sm font-semibold text-gray-700">
          <span>QUANTITY</span>
          <span>PRICE</span>
          <span>TOTAL</span>
        </div>
      </div>
      
      {/* Empty Cart */}
      <Link to='/'>
      <div className="text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
        <span>&larr;</span> Continue Shopping
      </div></Link>
    </div>

    {/* Right: Order Summary */}
    <div className="border rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2 text-sm">
        <span className="text-gray-600">ITEMS 0</span>
        <span className="font-semibold">Rs. 0</span>
      </div>

      <div className="border-t border-b py-3 mb-4">
        <p className="text-sm font-medium text-gray-600 mb-1">SHIPPING</p>
        <select className="w-full border p-2 rounded text-sm">
          <option>Standard shipping - Rs. 100</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600 mb-1">PROMO CODE</p>
        <input
          type="text"
          placeholder="Enter your code"
          className="w-full border p-2 rounded text-sm mb-2"
        />
        <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded text-sm">
          APPLY
        </button>
      </div>

      <div className="flex justify-between text-sm font-semibold mb-4">
        <span>TOTAL COST</span>
        <span>Rs. 0</span>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded text-sm font-semibold">
        CHECKOUT
      </button>
    </div>
  </div>
  )
}
