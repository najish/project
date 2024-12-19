// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBagShopping, FaCircleUser, FaBars } from "react-icons/fa6";
import "./Header.css";
import Login from './Login';   // Corrected import
import Signup from "./Signup";
const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeForm, setActiveForm] = useState(null); // Track active form (login or signup)
    const [overlay, setOverlay] = useState(false);     // Manage overlay visibility

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const openForm = (formType) => {
        setActiveForm(formType);
        setOverlay(true); // Show the overlay when either form is opened
    };

    const closeForm = () => {
        setOverlay(false); // Hide the overlay when closing the form
        setActiveForm(null); // Clear the active form state
    };

    return (
        <header className="header">
            <nav className="nav">
                {/* Left Section: Logo */}
                <div className="nav-left">
                    <div className="logo">
                        <img src="../../public/favicon_io/favicon.ico" alt="E-commerce Logo" />
                    </div>
                </div>

                {/* Middle Section: Searcfh Bar */}
                <div className={`nav-center ${menuOpen ? "open" : ""}`}>
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            className="search-input"
                            type="text"
                            name="search-product"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button" type="submit">
                            Search
                        </button>
                    </form>
                </div>

                {/* Right Section: Profile, Cart, and Hamburger */}
                <div className="nav-right">
                    <div className="user-profile" onClick={() => openForm("login")}>
                        <FaCircleUser size={25} title="User Profile" />
                    </div>
                    <div className="user-cart">
                        <FaBagShopping size={25} title="Cart" />
                    </div>
                    <Link className="nav-link" onClick={() => openForm('signup')}>Sign Up</Link>
                    <Link className="nav-link" onClick={() => openForm('login')}>Login</Link>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <FaBars size={25} />
                    </button>
                </div>
            </nav>

            {/* Overlay for Signup and Login Modals */}
            {overlay && (
                <div className="overlays">
                        {activeForm === "signup" ? (
                            <Signup closeForm={closeForm} />
                        ) : activeForm === "login" ? (
                            <Login closeForm={closeForm} />
                        ) : null}
                </div>
            )}
        </header>
    );
};

export default Header;
