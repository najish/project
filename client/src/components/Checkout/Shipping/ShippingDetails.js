import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For form validation
import './ShippingDetails.css';
import axios from "axios";

function ShippingDetails() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define form validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Full Name is required"),
        addressLine: Yup.string().required("Address Line is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        postalCode: Yup.string()
            .matches(/^\d{5}$/, "Postal Code must be 5 digits")
            .required("Postal Code is required"),
        country: Yup.string().required("Country is required"),
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
    });

    // Initialize Formik with form values, validation, and submission
    const formik = useFormik({
        initialValues: {
            name: '',
            addressLine: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            phoneNumber: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);

            try {
                const formData = {
                    ...values,
                    username: 'najish.eqbal',
                    email: 'najish.eqbal@gmail.com'
                };
                const response = await axios.post(`${process.env.REACT_APP_SERVER_API_URL}/shipping`, formData);
                console.log("Shipping Info Submitted:", response.data);
                setIsSubmitting(false);
            } catch (err) {
                console.error("Error submitting shipping details:", err);
                setIsSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (isSubmitting) {
            console.log("Submitting form...");
        }
    }, [isSubmitting]);

    return (
        <div className="shipping-details">
            <h2>Shipping Details</h2>
            <form className="shipping-form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your full name"
                    />
                    {formik.touched.name && formik.errors.name && <span className="error">{formik.errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine">Address Line</label>
                    <input
                        type="text"
                        id="addressLine"
                        name="addressLine"
                        value={formik.values.addressLine}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your address line"
                    />
                    {formik.touched.addressLine && formik.errors.addressLine && <span className="error">{formik.errors.addressLine}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your city"
                    />
                    {formik.touched.city && formik.errors.city && <span className="error">{formik.errors.city}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your state"
                    />
                    {formik.touched.state && formik.errors.state && <span className="error">{formik.errors.state}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your postal code"
                    />
                    {formik.touched.postalCode && formik.errors.postalCode && <span className="error">{formik.errors.postalCode}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your country"
                    />
                    {formik.touched.country && formik.errors.country && <span className="error">{formik.errors.country}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your phone number"
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && <span className="error">{formik.errors.phoneNumber}</span>}
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Shipping Info"}
                </button>
            </form>
        </div>
    );
}

export default ShippingDetails;
