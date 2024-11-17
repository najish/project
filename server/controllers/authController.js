const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
exports.signup = async (req, res) => {
    const { username, email, password } = req.body
    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({where: {email}})
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}



exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    try {
        // Check if user exists by email
        const user = await User.findOne({ where: { email } });
        console.log(email)
        console.log(password)
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the hashed password stored in DB with the incoming password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Create a JWT token (optional)
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'MY_JWT_SECRET', // Replace with your secret key
            { expiresIn: '1h' } // Token expires in 1 hour (adjust as needed)
        );

        return res.status(200).json({
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email,
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

    return res.send("hello from login")
};