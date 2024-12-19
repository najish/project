import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import Products from "./pages/user/Products";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route for users */}
        <Route path="/" element={<Navigate to="/user/products" replace />} />

        {/* User routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin routes (explicit) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;



