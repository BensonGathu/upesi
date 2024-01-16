import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from './components/Auth/Login';
import RegistrationForm from './components/Auth/Registration';
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {

  return (
  
    <div className="App">
         

    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* <Route path="registration" element={<RegistrationForm/>} /> */}
        <Route path="login" element={<LoginForm/>} />
        <Route path="products" element={<ProductsPage/>} />
        <Route path="/products/:id" element={<ProductDetailsPage/>} />
       
      </Routes>

      <Footer />
    </BrowserRouter>
   

  </div>
    )

}

export default App
