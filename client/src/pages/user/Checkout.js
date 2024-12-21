import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { FaSpinner, FaCashRegister } from "react-icons/fa";
import { AiOutlineCreditCard } from "react-icons/ai";
import { IoQrCodeOutline } from "react-icons/io5";
import "./Checkout.css";

const Checkout = () => {
    const { user } = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [loading, setLoading] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [error, setError] = useState(null); // To display errors
    const {cart} = useContext(UserContext)

    useEffect(() => {
        const fetchAddresses = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/address/user/${user.id}`);
                    setAddresses(response.data.user.Addresses);
                } catch (err) {
                    console.error("Error fetching addresses:", err);
                    setError("Unable to load addresses. Please try again later.");
                }
            }
         };

        fetchAddresses();
    }, [user]);

    const handleOrderConfirmation = async () => {
        if (!selectedAddress || !paymentMethod) {
            setError("Please select an address and payment method.");
            return;
        }

        console.log(user)
        console.log(cart)
        console.log(selectedAddress)
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const orderDetails = {
                userId: user.id,
                addressId: selectedAddress,
                paymentMethod: paymentMethod,
            };
            await axios.post("http://localhost:5000/api/confirm-order", orderDetails);
            setOrderConfirmed(true);
        } catch (err) {
            console.error("Error confirming order:", err);
            setError("Failed to confirm order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetOrder = () => {
        setOrderConfirmed(false);
        setSelectedAddress(null);
        setPaymentMethod("");
    };

    return (
        <div className="checkout-container">
            {user ? (
                <>
                    <div className="checkout-content">
                        <h2>Welcome, {user.firstName}!</h2>
                        <h3>Select Delivery Address:</h3>

                        {error && <p className="checkout-error-message">{error}</p>} {/* Display errors */}

                        <div className="checkout-address-list">
                            {addresses.length > 0 ? (
                                addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className={`checkout-address-item ${selectedAddress === address.id ? "checkout-selected" : ""
                                            }`}
                                        onClick={() => setSelectedAddress(address.id)}
                                    >
                                        <p>
                                            {address.landmark}, {address.city}, {address.state}, {address.pincode}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No addresses available. Please add one.</p>
                            )}
                        </div>

                        <button
                            className="checkout-add-address-btn"
                            onClick={() => alert("Add new address form")}
                        >
                            Add New Address
                        </button>

                        <h3>Select Payment Method:</h3>
                        <div className="checkout-payment-options">
                            <div
                                className={`checkout-payment-option ${paymentMethod === "cod" ? "checkout-selected" : ""}`}
                                onClick={() => setPaymentMethod("cod")}
                            >
                                <FaCashRegister />
                                <span>Cash on Delivery</span>
                            </div>
                            <div
                                className={`checkout-payment-option ${paymentMethod === "upi" ? "checkout-selected" : ""}`}
                                onClick={() => setPaymentMethod("upi")}
                            >
                                <IoQrCodeOutline />
                                <span>UPI QR Code</span>
                            </div>
                            <div
                                className={`checkout-payment-option ${paymentMethod === "card" ? "checkout-selected" : ""}`}
                                onClick={() => setPaymentMethod("card")}
                            >
                                <AiOutlineCreditCard />
                                <span>Credit/Debit Card</span>
                            </div>
                        </div>


                        <div className="checkout-confirm-order-btn">
                            <button
                                onClick={handleOrderConfirmation}
                                disabled={loading || !selectedAddress || !paymentMethod}
                            >
                                {loading ? <FaSpinner className="checkout-spinner" /> : "Confirm Order"}
                            </button>
                        </div>
                    </div>

                    {/* Order Confirmation Overlay */}
                    {orderConfirmed && (
                        <div className="checkout-order-confirmation-overlay">
                            <div className="checkout-order-confirmation-message">
                                <h3>Order Confirmed!</h3>
                                <p>Your order has been successfully placed. We will notify you once it's shipped.</p>
                                <button className="checkout-add-address-btn" onClick={resetOrder}>
                                    Place Another Order
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <p className="checkout-error-message">Please log in to proceed with the checkout.</p>
            )}
        </div>
    );
};

export default Checkout;
