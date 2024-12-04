import React, { useState, useContext } from 'react';
import './LoginForm.css'; // Import the CSS for the login form
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { UserContext } from '../../../context/UserContext';

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.email.includes('@')) errors.email = 'Invalid email format';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const loginUrl = process.env.REACT_APP_SERVER_API_URL;
      const response = await axios.post(`${loginUrl}/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      login(response.data.user);
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      console.log('credential', credential)
      const loginUrl = process.env.REACT_APP_SERVER_API_URL;
      const responseFromServer = await axios.post(`${loginUrl}/auth/google`, { token: credential });

      localStorage.setItem('token', responseFromServer.data.token);
      login(responseFromServer.data.user);
      navigate('/products');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleGoogleFailure = () => {
    console.log('Google login failed');
  };

  return (
    <div className="main-section-container">
      <div className="login-form-container">
        <h2 className="form-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="login-form-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message" style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="login-form-input"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-message" style={{ color: "red" }}>{errors.password}</p>}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn submit-btn">Login</button>
            <button type="button" className="btn cancel-btn" onClick={() => setFormData({ email: '', password: '' })}>
              Cancel
            </button>
          </div>

        </form>
        <div className="oauth-container">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap={false}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
