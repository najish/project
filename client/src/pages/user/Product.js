import './Product.css';
import { FaCartPlus } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { cart, setCart } = useContext(UserContext);

    const handleCart = (id) => {
        console.log('Cart button clicked', id);
        const newCart = undefined

        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            // If product exists, update its quantity
            const updatedCart = cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCart(updatedCart);
            console.log(updatedCart)
        } else {
            // If product does not exist, add it to the cart
            const newCart = [...cart, { id, quantity: 1 }];
            setCart(newCart);
            console.log(newCart);
        }
    };

    return (
        <div key={product.id} className="product-item">
            <Link to={`/user/product/details/${product.id}`}>
                <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
            </Link>
            <p className="price">Price : ${product.price}</p>
            <div className="product-buttons">
                <button onClick={() => handleCart(product.id)}>
                    Add To Cart <FaCartPlus size={25} />
                </button>
                <button>Buy Now</button>
            </div>
        </div>
    );
};

export default Product;
