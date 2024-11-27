import React, {useState, useEffect} from 'react';
import './Checkout.css';  // Make sure to create Checkout.css for styling
import './Shipping/ShippingDetails'
import ShippingDetails from './Shipping/ShippingDetails';
const Checkout = ({cart}) => {
    
    console.log(cart)
    return (
        <div className="checkout-container">
            <div className='checkout-row'>
                <h2>Login</h2>
            </div>
            <div className="checkout-row">
                <h2>Shipping Information</h2>
                <ShippingDetails />
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
                <button className="place-order-btn">Confirm Order</button>
            </div>
        </div>
    );
};

export default Checkout;
