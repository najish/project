import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBagShopping, FaCircleUser, FaBars } from "react-icons/fa6";
import "./Header.css";
import Login from './Login';
import Signup from "./Signup";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeForm, setActiveForm] = useState(null); // Track active form (login or signup)
    const [overlay, setOverlay] = useState(false);     // Manage overlay visibility
    const { cart, setCart, searchItem, setSearchItem, user, setUser } = useContext(UserContext);
    const navigate = useNavigate()
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log("Searching for:", searchTerm);
        setSearchItem(searchTerm);
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

    // Handle logout
    const handleLogout = () => {
        setUser(null); // Clear the user data in context
        localStorage.removeItem('token'); // Optionally remove the token from localStorage
    };


    const handleCartIcon = () => {
        navigate('/user/cart')
    }

    return (
        <header className="header">
            <nav className="nav">
                {/* Left Section: Logo */}
                <div className="nav-left">
                    <div className="logo">
                        <Link to='/user/products'>
                            <img src="/icon.png" alt="E-commerce Logo" />
                        </Link>
                    </div>
                </div>

                {/* Middle Section: Search Bar */}
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
                    <div className="user-profile">
                        <FaCircleUser size={25} title="User Profile" />
                    </div>

                    {/* User Profile Menu - Show only when user is logged in */}
                    {user && (
                        <div className='user-profile-menu'>
                            <ul className="user-profile-menu-list">
                                <li>Profile</li>
                                <li>Orders</li>
                                {/* Logout Button */}
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}

                    <div className="user-cart">
                        <FaBagShopping style={{ color: 'white' }} size={25} title="Cart" onClick={handleCartIcon} />
                        {cart?.length > 0 ? (
                            <sup className="cart-length">{cart.length}</sup>
                        ) : (
                            '0'
                        )}
                    </div>

                    {/* Conditional rendering of Login/Signup links if the user is not logged in */}
                    {!user ? (
                        <>
                            <Link className="nav-link" onClick={() => openForm('signup')}>Sign Up</Link>
                            <Link className="nav-link" onClick={() => openForm('login')}>Login</Link>
                        </>
                    ) : (
                        <span className="user-logged">{user.firstName}</span> // Display the username if logged in
                    )}

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
