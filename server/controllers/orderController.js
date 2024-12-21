const { sequelize, Order,OrderItem,Product, User,Address } = require('../models/associations')
const asyncHandler = require('../middlewares/asyncHandler')




const getOrders = async (req, res) => {
  try {
    // return res.send("get orders method") 
    const orders = await Order.findAll({
      include: {
        model: Product,
        attributes: []
      }
    })
    return res.status(200).json({
      message: 'Orders retreived!',
      orders: orders
    })

  } catch (err) {
    console.error('some error', err)
    return res.status(500).json({ err })
  }
}


const getOrder = async (req, res) => {
  try {
    // return res.send("get order method")
    const id = req.params.id
    const order = await Order.findOne({
      where: { id },
      
    });
    return res.status(200).json({
      message: 'Order retreived!',
      order: order
    })

  } catch (err) {
    console.error('some error', err)
    return res.status(500).json(err)
  }
}

const addOrder = async (req, res) => {
  try {
    const { totalPrice, orderStatus } = req.body;

    // Validate required fields
    if (!totalPrice || isNaN(totalPrice)) {
      return res.status(400).json({
        error: 'Total price is required and must be a valid number',
      });
    }

    // Create a new order
    const newOrder = await Order.create({
      totalPrice,
      orderStatus: orderStatus || 'pending', // Use the provided status or default to 'pending'
    });

    // Return success response
    return res.status(201).json({
      message: 'Order added successfully!',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error adding order:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
};

const editOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Get the order ID from the URL parameters
    const { totalPrice, orderStatus } = req.body;

    // Validate order ID
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    // Validate required fields
    if (totalPrice && isNaN(totalPrice)) {
      return res.status(400).json({ error: 'Total price must be a valid number' });
    }

    // Find the order by ID
    const order = await Order.findOne({ where: { id: orderId } });

    // If order does not exist, return 404
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order with new data
    const updatedOrder = await order.update({
      totalPrice: totalPrice || order.totalPrice, // Use existing value if not provided
      orderStatus: orderStatus || order.orderStatus, // Use existing value if not provided
    });

    // Return the updated order
    return res.status(200).json({
      message: 'Order updated successfully!',
      order: updatedOrder,
    });
  } catch (err) {
    console.error('Error editing order:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Get the order ID from the URL parameters

    // Validate order ID
    if (!orderId || isNaN(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID' });
    }

    // Find the order by ID
    const order = await Order.findOne({ where: { id: orderId } });

    // If the order does not exist, return 404
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Delete the order
    await order.destroy();

    // Return success response
    return res.status(200).json({
      message: 'Order deleted successfully!',
    });
  } catch (err) {
    console.error('Error deleting order:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message,
    });
  }
};


const placeOrder = asyncHandler(async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { userId, addressId, paymentMethod, cart } = req.body;

    // Fetch user and address
    const user = await User.findByPk(userId, { transaction: t });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = await Address.findByPk(addressId, { transaction: t });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Calculate total price
    let totalPrice = 0;
    const orderItems = [];

    // Fetch products in the cart and calculate total price
    for (let item of cart) {
      const product = await Product.findByPk(item.id, { transaction: t });
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      if (product.stockQuantity >= item.quantity) {
          product.stockQuantity -= item.quantity
          await product.save({transaction: t})
      }

      const orderItem = {
        productId: item.id,
        quantity: item.quantity,
        price: product.price, // Assuming each product has a price field
        total: product.price * item.quantity
      };
      totalPrice += orderItem.total;
      orderItems.push(orderItem);
    }

    // Create the order
    const order = await Order.create(
      {
        userId,
        addressId,
        paymentMethod,
        totalPrice,
        orderStatus: 'pending' // Set initial order status
      },
      { transaction: t }
    );

    // Create order items
    for (let item of orderItems) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.total
        },
        { transaction: t }
      );
    }

    // Commit the transaction
    await t.commit();

    return res.status(200).json({
      message: 'Order completed successfully!',
      orderId: order.id,
      statusCode: 200
    });
  } catch (err) {
    // If any error occurs, rollback the transaction
    await t.rollback();
    console.error(err);
    return res.status(500).json({
      message: 'Order failed due to an error.',
      error: err.message
    });
  }

});


module.exports = { addOrder, editOrder, getOrders, getOrder, deleteOrder, placeOrder }