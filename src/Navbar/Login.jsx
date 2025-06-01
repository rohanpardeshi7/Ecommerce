import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa'; // Import icons for Google and Facebook
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../FireBaseConfig';
import { FacebookAuthProvider } from "firebase/auth";
import { counterContext } from '../MainContaxt';




export default function Login() {
  let{
    user,
    setUser,
    token,
    setToken
  }=useContext(counterContext)
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app); // Ensure 'app' is imported from your Firebase configuration file
  // Initialize Firebase Auth and Google Auth Provider
  const facebookProvider = new FacebookAuthProvider(); // Initialize Facebook Auth Provider

  let emailHandler = (event) => {
    setEmail(event.target.value);
  };

  let passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  let submitHandler = (event) => {
    event.preventDefault();
    if (email && password) {
      navigate("/"); // Navigate to home/dashboard after successful login
    } else {
      alert("Please fill all the fields");
    }
  };

  // Placeholder functions for social logins
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result)=>{
          const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    setToken(token); // Set the token in state
    const user = result.user;
    setUser(user); // Set the user in state
    navigate("/"); // Navigate to home/dashboard after successful login

    })
    .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  };

  // const handleFacebookLogin = () => {
  //   signInWithPopup(auth, provider)
  //   .then((result)=>{
  //         const user = result.user;
  //   const credential = FacebookAuthProvider.credentialFromResult(result);
  //   const accessToken = credential.accessToken;
  //   })
  //   .catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = FacebookAuthProvider.credentialFromError(error);

  //   // ...
  // });
  // };
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to home/dashboard if user is already logged in
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Adjusted class to className */}
        <p className="text-gray-600 text-center mb-6">Enter your details to Login.</p>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              id="email"
              onChange={emailHandler}
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="hello@alignui.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
            <input
              type="password"
              id="password"
              onChange={passwordHandler}
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="••••••••"
            />
            <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>

          {/* Social Login Buttons */}
          <div className="mt-4 space-y-3">
            <button
              type="button" // Use type="button" to prevent form submission
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
            {/* <button
              type="button" // Use type="button" to prevent form submission
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition-colors duration-200"
            >
              <FaFacebookF className="mr-2" /> Login with Facebook
            </button> */}
          </div>

          <p className="text-gray-600 text-xs text-center mt-4">
            By clicking Register, you agree to accept Apex Financial's
            <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>.
          </p>
        </form>
      </div>
    </div>
  );
}