import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Signup.css';
import GoogleAuthButton from '../../pages/user/GoogleAuthButton'
import FacebookAuthButton from '../../pages/user/FacebookAuthButton'
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
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
  const navigate = useNavigate()

  const {user, setUser} = useContext(UserContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic (e.g., send data to server)
    console.log(formData);


    try { 

      if(formData.password !== formData.confirmPassword) {
        alert('Password didnt matched')
        return
      }

      delete formData.confirmPassword
      console.log(formData)
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData)

      if(!response && !response.data) {
        alert('failed to signup')
      }
      console.log(response.data)
      setUser(response.data)
      navigate('/')

    } catch(err) {
      console.error(err)
    }
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

       
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
      <div className='signup-auth'>
        <GoogleAuthButton />
        <button>Facebook</button>
      </div>
    </div>
  );
};

export default Signup;
