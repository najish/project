import React from 'react'
import { useFormik } from 'formik'

function YoutubeForm() {

    const formik = useFormik({
        initialValues: {
            name: '',
            password:'',
            channel: ''
        },
        onSubmit: values => {
            console.log('submit button is clicked')
        },

        validate: values => {
            const name = values.name
            return name
        }
    })

    // console.log('Form values ', formik.values)


    

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input id='name' name='name' placeholder='enter your name' type='text' onChange={formik.handleChange} value={formik.values.name}/>

            <label htmlFor='password'>Password</label>
            <input id='password' name='password' placeholder='enter your password' type='password' onChange={formik.handleChange} value={formik.values.password} />

            <label htmlFor='channel'>Channel Name</label>
            <input id='channel' name='channel' placeholder='enter channel name' type='text' onChange={formik.handleChange} value={formik.values.channel} />

            <button type='submit'>Submit Data</button>
        </form>
    )
}

export default YoutubeForm