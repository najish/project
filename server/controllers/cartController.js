const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const asyncHandler = require('../middlewares/asyncHandler'); // Import the asyncHandler

// Get the user's cart (active or completed)
// const getCart = asyncHandler(async (req, res) => {
//   const userEmail = req.params.userEmail;

//   // Find the cart for the user
//   const cart = await Cart.findOne({ where: { userEmail, status: 'active' } });

//   if (!cart) {
//     return res.status(404).json({ error: 'Cart not found' });
//   }

//   return res.status(200).json({ cart });
// });

// const getCart = asyncHandler(async (req,res,next) => {
//   // const userEmail = req.params.userEmail
//   console.log("hello from useremial : cart")
// })


const getCart = (req,res,next) => {
  console.log(next)
  return res.send("hello")
}

// Add an item to the user's cart
const addItemToCart = asyncHandler(async (req, res) => {
  const { userEmail, productId, quantity } = req.body;

  // Validate inputs
  if (!userEmail || !productId || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if the cart exists for the user, if not, create one
  let cart = await Cart.findOne({ where: { userEmail, status: 'active' } });

  if (!cart) {
    cart = await Cart.create({ userEmail, status: 'active' });
  }

  // Check if the item already exists in the cart
  let cartItem = await CartItem.findOne({
    where: { cartId: cart.id, productId },
  });

  if (cartItem) {
    cartItem.quantity += quantity; // Increase the quantity if the item is already in the cart
    await cartItem.save();
  } else {
    // Otherwise, create a new cart item
    cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
      price: 100,  // You might want to get the actual price from the Product model
    });
  }

  return res.status(201).json({
    message: 'Item added to cart successfully',
    cartItem,
  });
});

// Update the status of the cart (e.g., 'active' to 'completed')
const updateCartStatus = asyncHandler(async (req, res) => {
  const userEmail = req.params.userEmail;
  const { status } = req.body;

  // Validate the status
  if (!status || !['active', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid cart status' });
  }

  // Find the cart and update the status
  const cart = await Cart.findOne({ where: { userEmail, status: 'active' } });

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  cart.status = status;
  await cart.save();

  return res.status(200).json({
    message: 'Cart status updated successfully',
    cart,
  });
});

// Delete the user's cart
const deleteCart = asyncHandler(async (req, res) => {
  const userEmail = req.params.userEmail;

  // Find the cart and delete it
  const cart = await Cart.findOne({ where: { userEmail, status: 'active' } });

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  await cart.destroy();

  return res.status(200).json({
    message: 'Cart deleted successfully',
  });
});

module.exports = {
  getCart,
  addItemToCart,
  updateCartStatus,
  deleteCart,
};
