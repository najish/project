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
  return res.status(201).json(user);
});

// Update a user
const editUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  const data = req.body
  const user = await User.findByPk(id)
  if(!user) {
    return res.status(404).json('User not found')
  }

  await user.update(data)
  await user.save()
  return res.status(201).json({
    message: "hello", id, user
  })
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  console.log(id)
  const user = await User.findByPk(id)
  if (!user) {
    return res.status(404).json({
      message: "User not found to be deleted"
    })
  }
  await user.destroy()
  return res.status(200).json({
    user
  })
});

// Random User Endpoint
const randomUser = asyncHandler(async (req, res, next) => {
  const users = await User.findAll(); // Ensure the User model is defined
  res.status(200).json({
    message: "Data from random",
    users, // Return the fetched users
  });
});



// Export controllers
module.exports = { getUser, getUsers, addUser, editUser, deleteUser, randomUser };
