import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your actual Google Client ID

const App = () => {
  const [cart, setCart] = useState([]);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Header />
        <Main cart={cart} setCart={setCart} />
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;

