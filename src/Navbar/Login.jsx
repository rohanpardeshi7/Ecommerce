import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let navigate = useNavigate()
  let emailHandler = (event) =>{
    setEmail(event.target.value)
  }
  let passwordHandler = (event) =>{
    setPassword(event.target.value)
  }
  let submitHandler = (event) =>{
    event.preventDefault()
    if(email && password){
      navigate("/")
    }else{
      alert("Please fill all the fields")
    }}
  return (
<div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
       
        <p class="text-gray-600 text-center mb-6">Enter your details to Login.</p>
        <form onSubmit={submitHandler}>
            
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                <input type="email" id="email" onChange={emailHandler}  class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@alignui.com "/>
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                <input type="password" id="password" onChange={passwordHandler} class="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••"/>
                <p class="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
            </div>
            
            <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
            <p class="text-gray-600 text-xs text-center mt-4">
                By clicking Register, you agree to accept Apex Financial's
                <a href="#" class="text-blue-500 hover:underline">Terms and Conditions</a>.
            </p>
        </form>
    </div>
</div>
  )
}
