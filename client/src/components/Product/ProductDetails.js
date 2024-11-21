import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function ProductDetails() {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    useEffect(() => {
        try {

            const fetchProduct = async () => {
                const response = await axios.get(`http://localhost:5000/products/${id}`)
                console.log(response.data.product)
                setProduct(response.data.product)
            }

            fetchProduct()
        } catch (err) {
            console.error(err)
        }
    })
    return (
        <>
            <div className='productdetails-container'>
                <div>

                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
                <div>
                    <img src='http://localhost:5000/images/product.jpeg' alt='product image'/>
                </div>
                <div className='slider'>
                    
                </div>
            </div>

        </>

    )
}

export default ProductDetails