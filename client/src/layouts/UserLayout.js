import React from "react";
import { Link, Outlet } from "react-router-dom"; // Import Link for navigation
import "./UserLayout.css"; // Import external CSS for styling
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Header />
      <main className="user-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
