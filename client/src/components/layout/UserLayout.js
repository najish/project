// src/components/layouts/UserLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => (
  <div>
    <header>User Header</header>
    <main>
      <Outlet /> {/* Nested routes */}
    </main>
  </div>
);

export default UserLayout;
