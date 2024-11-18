import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../Auth/Login/LoginForm';
import SignupForm from '../Auth/Signup/SignupForm';
import Product from '../Product/Product';
import Cart from '../Cart/Cart'
const Main = ({cart, setCart}) => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/products" element={<Product cart={cart} setCart={setCart}/>} />
        <Route path="/carts" element={<Cart cart={cart} setCart={setCart}/>} />
        <Route path="/" element={<p>Welcome! Please log in or sign up.</p>} />
      </Routes>
    </main>
  );
};

export default Main;
