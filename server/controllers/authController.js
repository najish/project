const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncHandler');

exports.signup = asyncHandler(async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use & user already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
    });

    return res.status(201).json({
        message: 'User created successfully',
        user: {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            firstname: newUser.firstName
        },
    });
});






exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Compare the hashed password stored in DB with the incoming password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign(
        { userId: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET, // Replace with your secret key
        { expiresIn: '1h' } // Token expires in 1 hour (adjust as needed)
    );

    return res.status(200).json({
        message: 'Login successful',
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
        },
        token,
    });
});
