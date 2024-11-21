import { Link } from 'react-router-dom'
import './Header.css'
import { useAuth } from '../../context/AuthContext'
function Header() {
    const {isLoggedIn, logout} = useAuth()

    return (
        <header className='header'>
            <nav>
                <ul className='nav-links'>

                        <li><Link to='/'>Home</Link></li>
                        <li><Link to="/products">Products</Link></li>  {/* Products link */}
                        <li><Link to="/about">About</Link></li>  {/* About link */}
                        <li><Link to="/carts">Cart</Link></li>  {/* Cart link */}
                    {isLoggedIn ? (
                        <button onClick={logout} className='btn'>Logout</button>
                    ) : (
                        <>
                            <li><Link to="/signup">SignUp</Link></li>  {/* Cart link */}
                            <li><Link to="/login">Login</Link></li>  {/* Cart link */}
                        </>
                    )}
                </ul>
            </nav>
        </header>

    )
}

export default Header