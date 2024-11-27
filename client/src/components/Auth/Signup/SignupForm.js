import React, { useState } from 'react';
import './SignupForm.css';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';  // Google OAuth

const SignupForm = () => {
  // State for managing form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const signupUrl = process.env.REACT_APP_SERVER_API_URL;
      const response = await axios.post(`${signupUrl}/auth/signup`, data);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong. Please try again');
    }
  };

  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  // Google OAuth Success handler
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const googleData = {
        token: response.credential, // Google token
      };
      const signupUrl = process.env.REACT_APP_SERVER_API_URL;
      const res = await axios.post(`${signupUrl}/auth/google`, googleData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Google login failed. Please try again.');
    }
  };

  // Google OAuth Error handler
  const handleGoogleLoginFailure = (error) => {
    setMessage('Google login failed. Please try again.');
  };

  // Facebook OAuth Success handler
  const responseFacebook = async (response) => {
    try {
      const facebookData = {
        userID: response.userID,
        accessToken: response.accessToken,
      };
      const signupUrl = process.env.REACT_APP_SERVER_API_URL;
      const res = await axios.post(`${signupUrl}/auth/facebook`, facebookData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Facebook login failed. Please try again.');
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Create an Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn submit-btn">Sign Up</button>
          <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>

      <div className="social-login">
        <h3>Or Sign Up With</h3>
        <div className="oauth-buttons">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
            theme="outline"
            shape="pill"
          />
          
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
