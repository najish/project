import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                setError("Failed to load product details.");
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-details-container">
            <div className="product-details">
                <div className="product-image">
                    <img
                        src={`http://localhost:5000/images/${product.image || "product.jpeg"}`}
                        alt={product.name || "Product"}
                    />
                </div>
                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Price: <strong>${product.price}</strong></p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
