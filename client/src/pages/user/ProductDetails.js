import { useEffect, useState } from 'react'
import './ProductDetails.css'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`)
                if (!response || !response.data) {
                    setError('Product Not Found')
                } else {
                    setProduct(response.data)
                    console.log(response.data)
                }
            } catch (err) {
                console.error(err)
                setError('An error occurred while fetching the product')
            }
        }

        fetchProduct()  // Call the function to fetch the product
    }, [id])

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!product) {
        return <div>Loading...</div>
    }

    const handleCancel = () => {
        navigate(-1)
    }

    const handleCheckout = () => {
        navigate('/user/products/cart')
    }

    return (
        <div className='product-details-container'>
            <div className='product-image'>
                <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
            </div>
            <div className='product-details'>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock Quantity: {product.stockQuantity}</p>
                <div>
                    <button onClick={handleCancel}>Checkout</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
