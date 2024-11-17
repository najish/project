import React, { useState } from 'react'
import styles from './LoginForm.module.css'

const LoginForm = () => {

    // State1
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // State2
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })


    // method
    const validateForm = () => {

        const newErrors = {}
        if (!formData.email) newErrors.email = "email is required"
        if (!formData.password) newErrors.password = "password is required"

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { email, passwrod } = e.target
        setFormData({
            ...formData,
            [email]: e.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm())
            console.log('Login form submitted:', formData)
    }

    return (
        <div className={styles.LoginFormContainer}>
            <h2 className={styles.FormTitle}>Login</h2>
            <form className={styles.LoginForm} onSubmit={handleSubmit}>
                <div className={styles.FormGroup}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' name='email' className={styles.LoginFormInput} onChange={handleChange} placeholder='Enter your email..' />
                </div>

                <div className={styles.FormGroup}>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' name='passwrod' className={styles.LoginFormInput} onChange={handleChange} placeholder='Enter your passwrod..' />
                </div>

                <div className={styles.FormGroup}>
                    <button type='submit' className={`${styles.SubmitBtn} ${styles.Btn}`}>Login</button>
                    <button type='button' className={`${styles.CancelBtn} ${styles.Btn}`}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm