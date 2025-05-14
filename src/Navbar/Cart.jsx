import React, { useContext } from "react";
import { counterContext } from "../MainContaxt";
import { toast, ToastContainer } from "react-toastify";

export default function Cart() {
  const { cart, setCart } = useContext(counterContext);

  const updateQty = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (type === "inc") {
            
          return { ...item, qty: item.qty + 1 };
        } else if (type === "dec" && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    if (confirm("Remove this item from cart?")) {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      toast.error("Product removed from cart");
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Subtotal</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
                  </td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">Rs. {item.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="px-2 py-1 bg-gray-200 rounded  hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">Rs. {item.price * item.qty}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="font-semibold text-black">
                <td colSpan="4" className="text-right px-4 py-3">Total:</td>
                <td className="px-4 py-3">Rs. {totalAmount}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
}
