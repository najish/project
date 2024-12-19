import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Importing the CSS file for styling

const Header = () => {
    return (
        <header className="admin-header">
            <nav>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/users">Manage Users</Link>
            </nav>
        </header>
    );
};

export default Header;
