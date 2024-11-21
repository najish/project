import React, { useState } from 'react';
import './Login.css';  // Import the CSS for the login form
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import FacebookAuth from '../FacebookAuth';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const postData = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password
    };
    try {
      const loginUrl = process.env.REACT_APP_SERVER_API_URL;
      const response = await axios.post(`${loginUrl}/auth/login`, loginData);
      localStorage.setItem('token', response.data.token);
      login();
      navigate('/products');
    } catch (err) {
      console.log('Login error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(formData);
  };

  const handleLoginFailure = () => {
    console.log('Google login failed');
  };

  const handleLoginSuccess = () => {
    console.log('Google login success');
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
              onChange={handleChange}
              placeholder="Enter your email..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="login-form-input"
              onChange={handleChange}
              placeholder="Enter your password..."
            />
          </div>

          <div className="btn-together">
            <button type="submit" className="submit-btn btn">Login</button>
            <button type="button" className="cancel-btn btn">Cancel</button>
          </div>

          <div className="oauth-container">
            <div className="google-login">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="google-btn"
                  >
                    Google
                  </button>
                )}
              />
            </div>
            <div className="facebook-login">
              <FacebookAuth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
