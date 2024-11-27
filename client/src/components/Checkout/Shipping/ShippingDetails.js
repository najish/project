import React, { useState } from "react";
import './ShippingDetails.css';

function ShippingDetails() {
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({
            ...shippingInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit the shipping info (e.g., save to database, proceed to payment)
            console.log("Shipping Info Submitted", shippingInfo);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!shippingInfo.name) newErrors.name = "Name is required";
        if (!shippingInfo.address) newErrors.address = "Address is required";
        if (!shippingInfo.city) newErrors.city = "City is required";
        if (!shippingInfo.state) newErrors.state = "State is required";
        if (!shippingInfo.zip || !/^\d{5}$/.test(shippingInfo.zip)) newErrors.zip = "Valid zip code is required";
        if (!shippingInfo.phone || !/^\d{10}$/.test(shippingInfo.phone)) newErrors.phone = "Valid phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className="shipping-details">
            <h2>Shipping Details</h2>
            <form onSubmit={handleSubmit} className="shipping-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                    />
                    {errors.state && <span className="error">{errors.state}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleChange}
                        placeholder="Enter your zip code"
                    />
                    {errors.zip && <span className="error">{errors.zip}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <button type="submit" className="submit-btn">Submit Shipping Info</button>
            </form>
        </div>
    );
}

export default ShippingDetails;
