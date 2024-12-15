const asyncHandler = require('../middlewares/asyncHandler');
const { User } = require('../models/associations'); // Assuming a User model

// Get a specific user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// Create a new user
const addUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Update a user
const editUser = asyncHandler(async (req, res) => {
  const [numAffectedRows, updatedUsers] = await User.update(req.body, {
    where: { id: req.params.id },
    returning: true, // Ensure your DB supports this
  });
  if (numAffectedRows === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(updatedUsers[0]); // Return the updated user
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const numDeletedRows = await User.destroy({
    where: { id: req.params.id },
  });
  if (numDeletedRows === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send(); // 204 should not have a response body
});

// Random User Endpoint
const randomUser = asyncHandler(async (req, res,next) => {
  const users = await User.findAll(); // Ensure the User model is defined
  res.status(200).json({
    message: "Data from random",
    users, // Return the fetched users
  });
});



// Export controllers
module.exports = { getUser, getUsers, addUser, editUser, deleteUser, randomUser };
