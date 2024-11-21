import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const [cart, setCart] = useState([]);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error("Google Client ID is not defined in the environment variables.");
    return <div>Error: Google Client ID is not set.</div>;  // Show error if client ID is not provided
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Header />
        <Main cart={cart} setCart={setCart} />
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
