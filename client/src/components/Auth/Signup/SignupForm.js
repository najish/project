import React, {useState} from 'react'
import './SignupForm.css'
import axios from 'axios'
const SignupForm = () => {
    // State for managing form fields
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })


    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        console.log('field has changes')
    }


    const validateForm = () => {
        const newErrors = {}
        if (!formData.username) newErrors.username = "username is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.password) newErrors.password = "Password is required"

        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                username: formData.username,
                email: formData.email,
                password: formData.password
            }
            console.log(formData)
            console.log(data)   
            const signupUrl = process.env.REACT_APP_SERVER_API_URL
            const response = await axios.post(`${signupUrl}/auth/signup`, data)
            setMessage(response.data.message)
            console.log(response)
            

        } catch(err) {
            if(err.message) {
                setMessage(err.response.data.error)
            } else {
                setMessage("something went wrong. Please try again")
            }
        }
    }

    return (
        <div className='signup-form-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className='signup-form'>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} placeholder='Enter your name..' />
                    {errors.username && <p>{errors.username}</p>}
                </div>


                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
                    {errors.email && <p className='error'>{errors.email}</p>}
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password' />
                    {errors.password && <p className='error'>{errors.password}</p>}
                </div>

                <div className='form-group'>
                    <label htmlFor='confirmPassword'>
                        Confirm Password
                    </label>
                    <input id='confirmPassword' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm your password' />
                    {errors.confirmPassword && (
                        <p className='error'>{errors.confirmPassword}</p>
                    )}
                </div>
                <button type='submit' className='btn submit-btn'>SignUp</button>
                <button type='button' name='Cancel' className='btn cancel-btn'>Cancel</button>
            </form>
        </div>
    )

}


export default SignupForm