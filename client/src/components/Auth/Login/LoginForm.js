import React, { useState } from 'react'
import styles from './LoginForm.module.css'
import './Login.css'
import axios from 'axios'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import FacebookAuth from '../FacebookAuth'

const LoginForm = () => {
    const { login } = useAuth()
    // State1
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    // State2
    // const [errors, setErrors] = useState({
    //     email: "",
    //     password: ""
    // })


    // method
    // const validateForm = () => {

    //     const newErrors = {}
    //     if (!formData.email) newErrors.email = "email is required"
    //     if (!formData.password) newErrors.password = "password is required"

    //     setErrors(newErrors)

    //     return Object.keys(newErrors).length === 0
    // }


    const postData = async (data) => {
        const loginData = {
            "email": data.email,
            "password": data.password
        }
        console.log(loginData)
        try {
            const loginUrl = process.env.REACT_APP_SERVER_API_URL
            const response = await axios.post(`${loginUrl}/auth/login`, loginData)
            console.log('login sucessfully', response)
            localStorage.setItem('token', response.data.token)
            login()
            navigate('/products')
        } catch (err) {
            console.log('some error')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        postData(formData)
    }


    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)
    const handleLoginFailure = () => {

    }

    const handleLoginSuccess = () => {
        
    }
    return (
        <div className='main-section-container'>

            <div className={styles.LoginFormContainer}>
                <h2 className={styles.FormTitle}>Login</h2>
                <form className={styles.LoginForm} onSubmit={handleSubmit}>
                    <div className={styles.FormGroup}>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' name='email' className={styles.LoginFormInput} onChange={handleChange} placeholder='Enter your email..' />
                    </div>

                    <div className={styles.FormGroup}>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' className={styles.LoginFormInput} onChange={handleChange} placeholder='Enter your passwrod..' />
                    </div>

                    <div className={`${styles.FormGroup} btn-together`}>
                        <button type='submit' className={`${styles.SubmitBtn} ${styles.Btn}`}>Login</button>
                        <button type='button' className={`${styles.CancelBtn} ${styles.Btn}`}>Cancel</button>
                    </div>

                    <div className='oauth-container'>
                        <div className='google-login'>
                            <GoogleLogin onSuccess={handleLoginSuccess}
                                onError={handleLoginFailure}   render={(renderProps) => (
                                    <button
                                      onClick={renderProps.onClick}
                                      disabled={renderProps.disabled}
                                      style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        backgroundColor: '#4285F4',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      Google {/* Customized text */}
                                    </button>
                                  )}/>
                        </div>
                        <div className='facebook-login'>
                            <FacebookAuth />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm