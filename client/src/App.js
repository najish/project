import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Cart from './components/Cart/Cart';
import Product from './components/Product/Product';
import Footer from './components/Footer/Footer';


const App = () => {
  const [cart, setCart] = useState([])
  
  return (
    <Router>

      <Header />
      <Main cart={cart} setCart={setCart}/>
      <Footer />

    </Router>
  );
};

export default App;
