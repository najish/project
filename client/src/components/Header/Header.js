import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isLoggedIn } = useContext(UserContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/favicon_io/apple-touch-icon.png" alt="Logo" className="logo-img" />
                </Link>
            </div>
            <nav>
                <div className="hamburger" onClick={toggleMenu}>
                    <FaBars size={24} />
                </div>
                <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/carts">
                            Cart <FaShoppingCart />
                        </Link>
                    </li>
                </ul>
                <div className="auth-links">
                    {isLoggedIn ? (
                        <div className="user-info">
                            <span className="username">
                                <FaUser /> {user.username}
                            </span>
                            <button onClick={logout} className="btn logout-btn">
                                Logout <FaSignOutAlt />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/signup" className="auth-link">
                                Sign Up
                            </Link>
                            <Link to="/login" className="auth-link">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
