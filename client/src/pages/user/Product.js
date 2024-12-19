import './Product.css'
import {FaCartPlus} from 'react-icons/fa'
const Product = ({ product }) => {
    return (
        <div key={product.id} className='product-item'>
            <img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className='price'>Price : ${product.price}</p>
            <div className='product-buttons'>
                <button>Add To Cart
                    <FaCartPlus size={25}/>
                </button>
                <button>Buy Now</button>
            </div>
        </div>
    )
}

export default Product