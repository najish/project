import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';
import AppProvider from './context/AppContext';
import appRoutes from '../src/routes/routes'; // Ensure correct path to routes
import RoleBasedLayout from './components/RoleBasedLayout';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';


const App = () => {
  const [cart, setCart] = useState([]);

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error("Google Client ID is not defined in the environment variables.");
    return <div>Error: Google Client ID is not set.</div>; // Show error if client ID is not provided
  }

  if (!Array.isArray(appRoutes)) {
    console.error("appRoutes is not a valid array.");
    return <div>Error: appRoutes is invalid.</div>; // Handle invalid appRoutes
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <AppProvider>
          <UserProvider>

            {/* <Header />
            <Main cart={cart} setCart={setCart} />
            <Footer /> */}


            <Routes>
              {/* Shared Role based layout */}
              <Route path='/' element={<RoleBasedLayout />} />

              {/* Admin Routes */}
              <Route path='/admin/dashboard' element={<AdminLayout />} />

              {/* User Routes */}
              <Route path='home' element={<UserLayout />} />
            </Routes>
          </UserProvider>
        </AppProvider>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;