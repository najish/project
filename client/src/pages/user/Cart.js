import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import {Button} from 'react-bootstrap'
import "./Cart.css";  // Import spinner CSS if needed
import { MdAlternateEmail } from "react-icons/md";

const Cart = () => {
    const { cart, setCart } = useContext(UserContext); // Access the cart from context
    const [products, setProducts] = useState([]); // Store fetched products
    const [loading, setLoading] = useState(true); // State to track loading status
    const navigate = useNavigate(); // Initialize navigation hook
    const [count, setCount] = useState(1)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Start loading
                setLoading(true);

                // Fetch product details for each item in the cart
                const productDetails = await Promise.all(
                    cart.map(async (item) => {
                        const response = await axios(
                            `http://localhost:5000/api/products/${item.id}`
                        );
                        response.data.quantity = item.quantity
                        return response.data;
                    })
                );
                setProducts(productDetails); // Update state with fetched products
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                // Stop loading after data is fetched
                setLoading(false);
            }
        };

        if (cart.length > 0) {
            fetchProducts();
        } else {
            setLoading(false);  // Stop loading if the cart is empty
        }
    }, [cart]);

    // Handle navigation to checkout
    const handleCheckout = () => {
        navigate("/user/checkout");
    };

    // Handle clearing the cart
    const handleCancel = () => {
        setCart([]); // Clear the cart in the context
        setProducts([]); // Clear the displayed products
    };

    const handleQuantity = () => {
        console.log('')
    }

    const incrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };
    
    const decrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };


    const removeProductFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId))
    }
    

    return (
        <div className="user-cart-container">
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                    <p>Loading cart...</p>
                </div>
            ) : products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-container">
                        <div className="product-image">
                            <img
                                src={`http://localhost:5000/${product.imageUrl}`}
                                alt={product.name}
                            />
                        </div>
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Stock: <span className='product-details-stock'>{product.stockQuantity > 0 ? "Available" : "Not Available"} </span></p>
                            <div>
                                <p>
                                    Quantity: 
                                    <span className="cart-quantity-button" onClick={() => decrementQuantity(product.id)}><button>-</button></span> 
                                    {product.quantity} 
                                    <span className="cart-quantity-button" onClick={() => incrementQuantity(product.id)}><button>+</button></span> 

                                </p>
                            </div>
                            <div>
                                <Button variant="danger" onClick={() => removeProductFromCart(product.id)}>Remove</Button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            {products.length > 0 && (
                <div className="cart-actions">
                    <button onClick={handleCheckout}>Checkout</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
