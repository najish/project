// src/components/RoleBasedLayout.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import UserLayout from '../components/layout/UserLayout';

const RoleBasedLayout = () => {
    const role = 'admin'
  if (role === 'admin') {
    return <AdminLayout />;
  }
  return <UserLayout />;
};

export default RoleBasedLayout;
