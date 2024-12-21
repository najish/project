import './Login.css'
import React, { useContext, useState } from 'react'
import GoogleAuthButton from '../../pages/user/GoogleAuthButton'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'

const Login = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [isFormVisible, setIsFormVisible] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")  // State to hold error message
  const { user, setUser } = useContext(UserContext)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    console.log(name, value)

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      // Make the API call to login
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      
      // Assuming response contains user data and token
      console.log(response.data)
      if (response.data) {
        setUser(response.data.user)  // Set the user context with the returned user data
        localStorage.setItem('token', response.data.token)  // Optionally store token in localStorage
        closeForm()  // Close the login form after successful login
      } else {
        setErrorMessage("Invalid email or password.")  // Set error message if login fails
      }
    } catch (err) {
      console.error(err)
      setErrorMessage("An error occurred. Please try again.")  // Set error message for network/API issues
    }
  }

  const handleCancel = () => {
    setIsFormVisible(false) // Hide the form when cancel button is clicked
    closeForm()
  }

  const handleGoogleLogin = (response) => {
    // Handle Google Login response here (you can pass the Google token to the backend)
    console.log('Google response:', response)
    // Example: Send the Google token to your backend for validation
    axios.post('http://localhost:5000/api/google-login', { token: response.tokenId })
      .then(res => {
        setUser(res.data.user)
        localStorage.setItem('token', res.data.token)
        closeForm()
      })
      .catch(err => {
        console.error(err)
        setErrorMessage('Google login failed. Please try again.')
      })
  }

  const handleFacebookLogin = () => {
    // Facebook login logic should be implemented here.
    // You can use the Facebook SDK to get the access token and send it to the backend for validation
    console.log('Facebook login clicked')
    // Example: Handle Facebook login API response
    // Send the Facebook token to your backend for validation
    axios.post('http://localhost:5000/api/auth/facebook-login', { token: 'facebook_token_here' })
      .then(res => {
        setUser(res.data.user)
        localStorage.setItem('token', res.data.token)
        closeForm()
      })
      .catch(err => {
        console.error(err)
        setErrorMessage('Facebook login failed. Please try again.')
      })
  }

  return (
    <div className="login-container">
      {isFormVisible && (
        <>
          <button className="cancel-btn" onClick={handleCancel}>X</button>
          <h2>Login User</h2>

          {/* Error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="submit-btn">Log In</button>
          </form>

          <div className='login-auth'>
            <GoogleAuthButton onSuccess={handleGoogleLogin} onFailure={(err) => console.log(err)} />
            <button className="facebook-btn" onClick={handleFacebookLogin}>Login with Facebook</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Login
