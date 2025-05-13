import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './Common/MainLayout.jsx'
import Cart from './Navbar/Cart.jsx'
import Register from './Navbar/Register.jsx'
import Products from './Navbar/Products.jsx'
import Login from './Navbar/Login.jsx'
import Error from './Error.jsx'
import MainContaxt from './MainContaxt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContaxt>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route path="/" element={<Home />} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/products' element={<Products/>}/> 
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Error/>}/>  
      </Route>
    </Routes>
    </BrowserRouter>
    </MainContaxt>
  </StrictMode>,
)
