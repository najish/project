import React, { useState, useEffect } from "react";
import './Product.css';
import { Routes, Route, Link } from "react-router-dom";
import Another from "./Another/Another";
import axios from "axios";
import ProductDetails from "./ProductDetails";

const Product = ({ cart, setCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true
            try {
                const serverUrl = process.env.REACT_APP_SERVER_API_URL;
                const response = await axios.get(`${serverUrl}/products`);
                setProducts(response.data.products);
            } catch (err) {
                console.error('Failed to fetch products', err.message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const productIndex = cart.findIndex((item) => item.id === product.id);
        const prod = { id: product.id, price: product.price, quantity: 1 };

        if (productIndex === -1) {
            setCart([...cart, prod]);
        } else {
            const updatedCart = [...cart];
            updatedCart[productIndex] = {
                ...updatedCart[productIndex],
                quantity: updatedCart[productIndex].quantity + 1,
            };
            setCart(updatedCart);
        }
    };

    return (
        <div className="product-container">
            <Routes>
                <Route path="/another" element={<Another />} />
                <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>

            <div className="product-container-center">
                {loading ? (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <ul className="product-list-container">
                        {products.map((product) => (
                            <li key={product.id} className="product">
                                <Link to={`/products/${product.id}`} className="product-link">
                                    <img
                                        src={`${process.env.REACT_APP_SERVER_API_URL}/${product.imageUrl}` || 'placeholder.jpg'}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <h3>{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-info">
                                        <p className="product-price">Price: ${product.price}</p>
                                        <p className="product-stock">Stock: {product.stockQuantity}</p>
                                    </div>
                                </Link>
                                <div className="product-actions">
                                    <button
                                        className="product-add-cart-btn"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add To Cart
                                    </button>
                                    <button className="product-buy-now-btn">Buy Now</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Product;
