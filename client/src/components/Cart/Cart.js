import React, { useEffect, useState } from "react";
import './Cart.css';
import axios from "axios";

const Cart = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const serverUrl = process.env.REACT_APP_SERVER_API_URL
                const response = await axios.get(`${serverUrl}/products/${id}?timestamp=${Date.now()}`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });
                return response.data; // Return the product details
            } catch (err) {
                console.error('Error while fetching product with id:', id, err);
                return null; // Return null if error occurs
            }
        };

        const fetchProductsInCart = async () => {
            const productDetails = await Promise.all(
                cart.map(async (c) => {
                    const response = await fetchData(c.id);
                    const product = response.product
                    // Only add product if fetch was successful
                    return product ? { ...product, quantity: c.quantity } : null;
                })
            );

            // Filter out any null values (failed fetches)
            setProducts(productDetails.filter(product => product !== null));
        };

        if (cart.length > 0) {
            fetchProductsInCart(); // Fetch the product details only if the cart has items
        }
    }, [cart]); // Trigger when cart changes

    return (
        <div className="cart-details">
            <div className="cart-products">
                {products.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {products.map((product) => (
                            <div key={product.id} className="cart-product">
                                {/* Render the product details */}
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                <div>
                                    <p>
                                        <p>-</p> 
                                        <input value={product.quantity} />
                                        <p>+</p>
                                    </p>
                                 </div>   
                                <p>Total Price : ${product.price * product.quantity}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div><button>Place Order</button></div>
            </div>
            
        </div>
    );
};

export default Cart;
