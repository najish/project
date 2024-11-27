import React, { useState, useEffect } from "react";
import './Product.css'
import { Routes, Route, Link } from "react-router-dom";
import Another from "./Another/Another";
import axios from "axios";
import ProductDetails from "./ProductDetails";

const Product = ({ cart, setCart }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const serverUrl = process.env.REACT_APP_SERVER_API_URL
                const response = await axios.get(`${serverUrl}/products`)
                setProducts(response.data.products)
            } catch (err) {
                console.log('Failed to fetch products')
            }
        }

        fetchProducts()
    }, [])

    const handleAddToCart = (product) => {
        console.log('Add to cart button is clicked', product)
        const productIndex = cart.findIndex((item) => item.id === product.id)
        const prod = {
            id: product.id,
            price: product.price,
            quantity: 1
        }

        if (productIndex === -1) {
            setCart([...cart, prod])
        } else {
            const updateProduct = [...cart]
            updateProduct[productIndex] = {
                ...updateProduct[productIndex],
                quantity: updateProduct[productIndex].quantity + 1
            }
            setCart(updateProduct)
        }
    }

    return (
        <>
            <div className="product-container">
                <Routes>
                    <Route path='/another' element={<Another />} />
                    <Route path='/products/:id' element={<ProductDetails />} />
                </Routes>

                {/* <h1>Product List</h1> */}
                <div className="product-container-center">
                    <ul className="product-list-container">
                        {products.map((product) => (
                            <li key={product.id} className="product">
                                <Link to={`/products/${product.id}`} className="product-link">
                                    <h3>{product.name}</h3>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-info">
                                        <p className="product-price">Price: ${product.price}</p>
                                        <p className="product-stock">Stock: {product.stockQuantity}</p>
                                    </div>
                                </Link>
                                <div className="product-actions">
                                    <button className="product-add-cart-btn" onClick={() => handleAddToCart(product)}>
                                        Add To Cart
                                    </button>
                                    <button className="product-buy-now-btn">Buy Now</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Product
