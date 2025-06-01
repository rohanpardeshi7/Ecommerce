import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { counterContext } from "../MainContaxt";
import { useNavigate } from "react-router-dom";


export default function Header() {
  let { user, setUser, token, setToken, cart } = useContext(counterContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-white bg-opacity-75 shadow-lg border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-4">
          <Link to="/" className="flex items-center space-x-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight underline">
              MiniMart
            </h1>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div
            className={`w-full md:block md:w-auto transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col gap-1 p-2 mt-2 border rounded-lg bg-gray-50 md:flex-row md:items-center md:space-x-4 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block px-3 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block px-3 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Cart ({cart.length})
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-3 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Products
                </Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={() => {
                      setUser(null);
                      setToken('');
                      navigate('/login');
                    }}
                    className="block w-full text-left px-3 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block px-3 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
