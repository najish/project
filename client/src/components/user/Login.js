import './Login.css'
import React, { useState } from 'react'

const Login = ({closeForm}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  
  const [isFormVisible, setIsFormVisible] = useState(true)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    console.log(name, value)

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleCancel = () => {
    setIsFormVisible(false) // Hide the form when cancel button is clicked
    closeForm()
  }

  return (
    <div className="login-container">
      {isFormVisible && (
        <>
          <button className="cancel-btn" onClick={handleCancel}>X</button>
          <h2>Login User</h2>
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
        </>
      )}
    </div>
  )
}

export default Login
