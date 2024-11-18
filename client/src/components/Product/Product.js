import React, { useState, useEffect, useReducer } from "react";
import styles from './Product.module.css'
import './Product.css'
import { Router, Routes, Route, Link } from "react-router-dom";
import Another from "./Another/Another";
import axios from "axios";



const Product = ({cart, setCart}) => {
    const [products, setProducts] = useState([])


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const serverUrl = process.env.REACT_APP_SERVER_API_URL
                const response = await axios.get(`${serverUrl}/products`)
                setProducts(response.data.products)
            } catch (err) {
                console.log('failed to fetch products')
            }
        }

        fetchProducts()
    }, [])


    useEffect(() => {
        console.log("Hello from use effects in product")
        console.log(cart)
    },[cart])

    const handleAddToCart = (product) => {

        console.log('add to cart button is clicked', product)
        const productIndex = cart.findIndex((item) => item.id === product.id)
        const prod = {
            id: product.id,
            price: product.price,
            quantity: 1
        }

        if(productIndex === -1) {
            setCart([...cart,prod])
        }
        else {
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
                </Routes>

                <h1>Product List</h1>
                <div className="product-container-center">

                    <ul className="product-list-container">
                        {products.map((product) => (
                            <li key={product.id} className="product">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <div>
                                    <p>Price: ${product.price}</p>
                                    <p>Stock: {product.stockQuantity}</p>
                                </div>
                                <div>
                                    <button className="product-add-cart-btn" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                                    <button className="product-buy-now-btn">Buy now</button>
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