import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import SignupForm from './components/Auth/Signup/SignupForm';
import LoginForm from './components/Auth/Login/LoginForm';
import Product from './components/Product/Product';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
