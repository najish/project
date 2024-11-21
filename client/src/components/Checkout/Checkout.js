import React from 'react';
import './Checkout.css';  // Make sure to create Checkout.css for styling

const Checkout = () => {
    return (
        <div className="checkout-container">
            <div className='checkout-row'>
                <h2>Login</h2>
            </div>
            <div className="checkout-row">
                <h2>Shipping Information</h2>
                <p>Enter your shipping details here.</p>
            </div>
            <div className="checkout-row">
                <h2>Payment Method</h2>
                <p>Choose your payment method.</p>
            </div>
            <div className="checkout-row">
                <h2>Order Summary</h2>
                <p>Review your items in the cart before proceeding.</p>
            </div>
            <div className="checkout-row">
                <button className="place-order-btn">Place Order</button>
            </div>
        </div>
    );
};

export default Checkout;
