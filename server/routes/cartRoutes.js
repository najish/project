const express = require('express');
const router = express.Router();
const {
  getCart,
  addItemToCart,
  updateCartStatus,
  deleteCart,
} = require('../controllers/cartController');

// Route to get the user's active cart
router.get('/:userEmail', getCart);

// Route to add an item to the cart
router.post('/add', addItemToCart);

// Route to update the status of the cart (e.g., from 'active' to 'completed')
router.put('/update-status/:userEmail', updateCartStatus);

// Route to delete a cart
router.delete('/delete/:userEmail', deleteCart);

module.exports = router;
