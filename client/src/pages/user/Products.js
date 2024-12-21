import { useEffect, useState, useContext } from 'react';
import './Products.css';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import Product from './Product';
import { UserContext } from '../../contexts/UserContext';

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { searchItem } = useContext(UserContext);

    // Fetch paginated products
    useEffect(() => {
        const fetchProducts = async () => {
            if (searchItem) return; // Skip fetching paginated products if searching
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:5000/api/products/pagination/${currentPage}`);
                if (response && response.data) {
                    setProducts(response.data);
                } else {
                    console.log('No products found');
                }
            } catch (err) {
                console.error('Failed to fetch products:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage, searchItem]); // Include searchItem to skip fetching default products

    // Fetch searched products
    useEffect(() => {
        if (!searchItem) return; // Skip if no search term
        const fetchSearchedProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:5000/api/products/searchItem/${searchItem}`);
                if (response && response.data) {
                    setProducts(response.data);
                } else {
                    console.log('No products found for the search term');
                }
            } catch (err) {
                console.error('Failed to fetch searched products:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSearchedProducts();
    }, [searchItem]);

    const handleNextButton = () => {
        if (!searchItem) setCurrentPage((current) => current + 1); // Only paginate if not searching
    };

    const handlePrevButton = () => {
        if (!searchItem && currentPage > 1) setCurrentPage((current) => current - 1); // Only paginate if not searching
    };

    return (
        <div className="products-container">
            {isLoading ? (
                <div className="loading-overlay">
                    <FaSpinner className="spinner" />
                </div>
            ) : (
                <>
                    <div className="products-list">
                        {products.length > 0 ? (
                            products.map((product) => <Product key={product.id} product={product} />)
                        ) : (
                            <div className="no-products">No products found.</div>
                        )}
                    </div>
                    {!searchItem && (
                        <div className="products-pagination">
                            <button onClick={handlePrevButton} disabled={currentPage === 1}>
                                <IoMdArrowRoundBack size={"20px"} />
                                Prev
                            </button>
                            <div className="currentPage">{currentPage}</div>
                            <button onClick={handleNextButton}>
                                Next
                                <IoMdArrowRoundForward size={"20px"} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;
