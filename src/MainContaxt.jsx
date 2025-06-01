import React, { createContext, useEffect, useState } from 'react'
export let counterContext = createContext()

export default function MainContaxt({children}) {
  let [user,setUser] = useState(JSON.parse(localStorage.getItem("USER")) ?? null)
  let [token,setToken] = useState(localStorage.getItem("TOKEN") ?? null)
    let [count,setCount] = useState()
    let [cart,setCart] = useState(JSON.parse(localStorage.getItem("CART")) ?? [])
    // let [cart,setCart] = useState([])  
    let obj ={
        count,
        setCount,
        cart,
        setCart,
        user,
        setUser,
        token,
        setToken
    }
   
    useEffect(() => {
       localStorage.setItem("CART", JSON.stringify(cart)  )
    }, [cart])  
    useEffect(()=>{
      localStorage.setItem("TOKEN",token)
      localStorage.setItem("USER", JSON.stringify(user))
    },[token, user])
    
  return (
    <counterContext.Provider value={obj}>
        {children}
        </counterContext.Provider>
  )
}
