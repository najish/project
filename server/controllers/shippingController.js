const ShippingAddress = require('../models/ShippingAddress')
const User = require('../models/User')
const addShippingAddress = async (req, res) => {

    // return res.json(req.body)
    try {
        const data = req.body
        const user = await User.findOne({
            where: {
                email: data.email
            }
        })
        if (!user) {
            return res.send('user not found')
        }
        data.userId = user.dataValues.id
        const response = await ShippingAddress.create(data)
        if (response) {
            return res.status(201).json({
                message: "shipping addresss added sucessfuly",
                body: response.dataValues
            })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


const getShippingAddress = async (req, res) => {
    try {
        const { username } = req.query;

        // Validate if username is provided
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the shipping address associated with the user
        const shippingAddress = await ShippingAddress.findOne({ where: { userId: user.id } });

        if (!shippingAddress) {
            return res.status(404).json({ message: 'No shipping address found' });
        }

        // Return the shipping address
        return res.status(200).json({
            message: 'Shipping address found',
            data: shippingAddress,
        });
    } catch (err) {
        console.error('Error fetching shipping address:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addShippingAddress,getShippingAddress }