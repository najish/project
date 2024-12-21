import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import "./Cart.css";  // Import spinner CSS if needed

const Cart = () => {
    const { cart, setCart } = useContext(UserContext); // Access the cart from context
    const [products, setProducts] = useState([]); // Store fetched products
    const [loading, setLoading] = useState(true); // State to track loading status
    const navigate = useNavigate(); // Initialize navigation hook

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
                            <p>Stock Quantity: {product.stockQuantity}</p>
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
