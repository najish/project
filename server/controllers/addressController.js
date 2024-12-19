const asyncHandler = require("../middlewares/asyncHandler");
const { Address, User } = require("../models/associations"); // Assuming Address and User models are associated

// Get All Addresses
const getAddresses = asyncHandler(async (req, res, next) => {
    const addresses = await Address.findAll();
    return res.status(200).json({ addresses });
});

// Get a Single Address
const getAddress = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Find the address by ID
    const address = await Address.findByPk(id);
    if (!address) {
        return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ address });
});

// Add a New Address
const addAddress = asyncHandler(async (req, res, next) => {
    const { userId, state, city, pincode, country, area, landmark } = req.body;

    console.log(req.body);
    const address = await Address.create({
        userId,
        state,
        city,
        area,
        pincode,
        country,
        landmark, // Include landmark
    });

    res.status(201).json({ message: "Address added successfully", address });
});

// Edit an Existing Address
const editAddress = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { state, city, area, pincode, country, landmark } = req.body;

    // Find the address by ID
    const address = await Address.findByPk(id);
    if (!address) {
        return res.status(404).json({ message: "Address not found" });
    }

    // Update the address with new data
    await address.update({
        state: state || address.state,
        city: city || address.city,
        area: area || address.area,
        pincode: pincode || address.pincode,
        country: country || address.country,
        landmark: landmark || address.landmark,
    });

    res.status(200).json({ message: "Address updated successfully", address });
});

// Delete an Address
const deleteAddress = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Find and delete the address by ID
    const address = await Address.findByPk(id);
    if (!address) {
        return res.status(404).json({ message: "Address not found" });
    }

    await address.destroy();
    res.status(200).json({ message: "Address deleted successfully" });
});

// Get User's Address by User ID
const getUserAddress = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findByPk(id, {
        include: Address,
        // raw: true
    })
    if(!user) {
        return res.status(404).json({
            message: 'invalid user id'
        })
    }
    return res.status(200).json({
        user
    })
});

// const getAddresses = async (req,res,next) => {

// }
// const getAddress= async (req,res,next) => {
    
// }
// const addAddress  = async (req,res,next) => {
    
// }
// const editAddress = async (req,res,next) => {
    
// }
// const deleteAddress = async (req,res,next) => {
    
// }
// const getUserAddress = async (req,res,next) => {
    
// }

module.exports = {
    getAddresses,
    getAddress,
    addAddress,
    editAddress,
    deleteAddress,
    getUserAddress,
};
