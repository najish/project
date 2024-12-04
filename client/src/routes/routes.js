// routes.js
import React from 'react';
import LoginForm from '../components/Auth/Login/LoginForm'
import SignupForm from '../components/Auth/Signup/SignupForm';
import Product from '../components/Product/Product';
import Cart from '../components/Cart/Cart';
import ProductDetails from '../components/Product/ProductDetails';
import Checkout from '../components/Checkout/Checkout';
import YoutubeForm from '../components/YoutubeForm';
const appRoutes = [
  { path: '/login', element: <LoginForm /> },
  { path: '/signup', element: <SignupForm /> },
  { path: '/products', element: <Product /> },
  { path: '/carts', element: <Cart /> },
  { path: '/products/:id', element: <ProductDetails /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/youtube', element: <YoutubeForm /> },
  { path: '/', element: <p>Welcome! Please log in or sign up.</p> },
  { path: '*', element: <p>Error no route defined!!</p>}
];

export default appRoutes;
