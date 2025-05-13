import React, { createContext, useEffect, useState } from 'react'
export let counterContext = createContext()

export default function MainContaxt({children}) {
    let [count,setCount] = useState()
    let [cart,setCart] = useState([])
    let obj ={
        count,
        setCount,
        cart,
        setCart
    }
   
    useEffect(() => {
       
    }, [cart])  
    
  return (
    <counterContext.Provider value={obj}>
        {children}
        </counterContext.Provider>
  )
}
