import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from '../../routes/routes';
const Main = ({ cart, setCart }) => {
  return (
    <main className="main-container">
      <Routes>

        {
          appRoutes.map((route,index) => (<Route key={index} path={route.path} element={route.element} />))
        }

      </Routes>
      
    </main>
  );
};

export default Main;
