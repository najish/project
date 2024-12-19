import { useEffect, useState } from 'react';
import './Products.css';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import Product from './Product';

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://localhost:5000/api/products/pagination/${currentPage}`);
                if (response && response.data) {
                    setProducts(response.data);
                    setIsLoading(false);
                } else {
                    console.log('No products found');
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage]);


    const handleNextButton = async () => {
        try {
            console.log('nenxt buttonc')
            setCurrentPage(current => current + 1)

        } catch(err) {
            console.error(err)
        }
    }

    const handlePrevButton = async () => {
        try {
            console.log('prev buttons')
            setCurrentPage(current => current - 1)
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div className='products-container'>
            {isLoading ? (
                <div className='loading-overlay'>
                    <FaSpinner className='spinner' />
                </div>
            ) : (<>
                <div className='products-list'>
                    {products.map(product => <Product product={product} />)}
                </div>
                <div className='products-pagination'>
                    <button onClick={handlePrevButton}>
                    <IoMdArrowRoundBack size={"20px"}/>
                        Prev
                        </button>
                    <div className='currentPage'>{currentPage}</div>
                    <button onClick={handleNextButton}>Next
                        <IoMdArrowRoundForward size={"20px"}/>
                    </button>
                </div>
            </>
            )}
        </div>
    );
};

export default Products;
