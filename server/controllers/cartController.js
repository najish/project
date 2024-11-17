const Cart = require('../models/Cart')
const CartItem = require('../models/CartItem')
const Product = require('../models/Product')

// Get the user's cart (active or completed)
const getCart = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;

    // Find the cart for the user
    const cart = await Cart.findOne({
      where: { userEmail, status: 'active' },
      include: {
        model: CartItem,
        include: Product, // Include product details in the cart items
      },
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    return res.status(200).json({
      message: 'Cart retrieved successfully',
      cart,
    });
  } catch (error) {
    console.error('Error getting cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add an item to the user's cart
const addItemToCart = async (req, res) => {
  try {
    const { userEmail, productId, quantity } = req.body;

    if (!userEmail || !productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the cart exists for the user, if not, create one
    let cart = await Cart.findOne({ where: { userEmail, status: 'active' } });

    if (!cart) {
      cart = await Cart.create({ userEmail, status: 'active' });
    }

    // Check if the item already exists in the cart, if so, update the quantity
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
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update the status of the cart (e.g., 'active' to 'completed')
const updateCartStatus = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error updating cart status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete the user's cart
const deleteCart = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error deleting cart:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartStatus,
  deleteCart,
};
