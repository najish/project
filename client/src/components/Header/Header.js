import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function Header() {
    const { isLoggedIn, logout, user } = useAuth();  // Assuming 'user' contains user info (including username)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/carts">Cart</Link></li>
                </ul>
                <div className="auth-links">
                    {isLoggedIn ? (
                        <div className="user-info">
                            <span className="username">{user.username}</span>
                            <button onClick={logout} className="btn logout-btn">Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/signup" className="auth-link">SignUp</Link>
                            <Link to="/login" className="auth-link">Login</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
