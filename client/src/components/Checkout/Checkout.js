import React, { useState, useEffect, useContext } from "react";
import "./Checkout.css"; // Styling for the component
import ShippingDetails from "./Shipping/ShippingDetails";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { FaTruck, FaWallet, FaCreditCard, FaUniversity, FaBox } from "react-icons/fa";

const Checkout = ({ cart }) => {
    const { user } = useContext(UserContext);
    const [address, setAddress] = useState(null);
    const [formattedAddress, setFormattedAddress] = useState("");

    useEffect(() => {
        if (!user || !user.username) return;

        const fetchShippingAddress = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_API_URL}/shipping/getShippingAddress?username=${user.username}`
                );

                if (response.data?.data) {
                    const fetchedAddress = response.data.data;
                    setAddress(fetchedAddress);

                    setFormattedAddress(
                        `${fetchedAddress.addressLine}, ${fetchedAddress.city}, ${fetchedAddress.state}, ${fetchedAddress.postalCode}, ${fetchedAddress.country}`
                    );
                }
            } catch (err) {
                console.error("Error fetching shipping address:", err);
            }
        };

        fetchShippingAddress();
    }, [user]);

    return (
        <div className="checkout-container">
            {/* Login Section */}
            <div className="checkout-row">
                <h2><FaBox /> Login</h2>
                <p>{user ? `Logged in as: ${user.username}` : "Please log in to proceed."}</p>
            </div>

            {/* Delivery Address */}
            <div className="checkout-row">
                <h2><FaTruck /> Delivery Address</h2>
                {!address ? (
                    <ShippingDetails />
                ) : (
                    <div>
                        <p>{formattedAddress}</p>
                        <p>Phone Number: {address.phoneNumber || "N/A"}</p>
                    </div>
                )}
            </div>

            {/* Payment Section */}
            <div className="checkout-row payment">
                <h2><FaWallet /> Payment Method</h2>
                <p>Choose your payment method:</p>
                <div className="payment-option">
                    <div className="payment-method">
                        <FaUniversity /> COD
                    </div>
                    <div className="payment-method">
                        <FaCreditCard /> Credit Card
                    </div>
                    <div className="payment-method">
                        <FaCreditCard /> Debit Card
                    </div>
                    <div className="payment-method">
                        <FaWallet /> EMI
                    </div>
                </div>
            </div>

            {/* Order Summary */}
            <div className="checkout-row">
                <h2><FaBox /> Order Summary</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
                <p>
                    <strong>Total:</strong> $
                    {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                </p>
            </div>

            {/* Place Order Button */}
            <div className="checkout-row">
                <button className="place-order-btn">Confirm Order</button>
            </div>
        </div>
    );
};

export default Checkout;
