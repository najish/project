import React, { useState } from 'react';
import './Signup.css';

const Signup = ({closeForm}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic (e.g., send data to server)
    console.log(formData);
  };

  const handleCancel = () => {
    setIsFormVisible(!isFormVisible)
    closeForm()
  }

  return (
    <div className="signup-container">
      <button className="cancel-btn" onClick={handleCancel}>X</button>
      <h2>Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

       
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
