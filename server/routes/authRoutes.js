const express = require('express')
const { signup, login } = require('../controllers/authController')
const authenticate = require('../middlewares/authMiddleware')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)



const generateJwtToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name }, // Payload
        process.env.JWT_SECRET, // Secret key from env
        { expiresIn: '1h' } // Expiry time (optional)
    );
};

const findOrCreateUser = async (payload) => {
    try {
        // Check if the user already exists based on email
        let user = await User.findOne({ where: { email: payload.email } });
        
        if (!user) {
            // If the user doesn't exist, create a new one with the payload data
            user = await User.create({
                username: payload.name || payload.email,  // Use name or email as fallback for username
                email: payload.email,
                googleId: payload.sub,  // Store Google ID (unique identifier for the user)
                profilePicture: payload.picture,  // Store the profile picture (optional)
            });
        }

        return user;  // Return the found or created user
    } catch (err) {
        console.error('Error in findOrCreateUser: ', err);
        throw err;  // Re-throw error to be handled by the calling function
    }
};



router.post('/google', async (req, res) => {
    const { token } = req.body
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
        });
        const payload = ticket.getPayload();
        console.log(payload); // { email, name, picture, etc. }
        const user = await findOrCreateUser(payload);

        // Generate and send a JWT token for the authenticated user
        const jwtToken = generateJwtToken(user); // Implement this method to create JWT

        res.json({ token: jwtToken, user });
    } catch (err) {
        console.error('Google authentication error:', err);
        res.status(400).send('Invalid Google token');
    }

    // res.send("hello from google")
})

router.post('/signup', signup)
router.post('/login', login)
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: `welcome, ${req.user.username}!`, user: req.user })
})



module.exports = router