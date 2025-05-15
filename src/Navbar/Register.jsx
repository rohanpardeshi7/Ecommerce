import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you want client-side navigation in the footer link

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically make an API call to register the user
    console.log('Form submitted:', { firstName, lastName, email, password });
    // After successful registration, you might redirect the user
  };

  return (
    <div>
      <div className="font-sans antialiased bg-grey-lightest h-screen"> {/* Added h-screen for full viewport height */}
        <div className="w-full bg-grey-lightest pt-16 flex flex-col justify-center"> {/* Adjusted padding-top and added flex for centering */}
          <div className="container mx-auto py-8">
            <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow-md"> {/* Added shadow-md for better visual lift */}
              <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">Register for a free account</div>
              <div className="py-4 px-8">
                <form onSubmit={handleSubmit}> {/* Added form and onSubmit handler */}
                  <div className="flex mb-4">
                    <div className="w-1/2 mr-1">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="first_name">First Name</label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                        id="first_name"
                        type="text"
                        placeholder="Your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2 ml-1">
                      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                        id="last_name"
                        type="text"
                        placeholder="Your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Your secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-grey text-xs mt-1">At least 6 characters</p>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <button
                      className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-center my-4">
              <Link to="/login" className="text-grey-dark text-sm no-underline hover:text-grey-darker">I already have an account</Link>
            </p>
          </div>
        </div>

        <footer className="w-full bg-grey-lighter py-8 mt-auto"> {/* Added mt-auto to push footer to the bottom */}
          <div className="container mx-auto text-center px-8">
            <p className="text-grey-dark mb-2 text-sm">This is a product of <span className="font-bold">Your Company</span></p>
          </div>
        </footer>
      </div>
    </div>
  );
}