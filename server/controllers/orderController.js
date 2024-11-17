const Order = require('../models/Order')
const Product = require('../models/Product')





const getOrders = async (req,res) => {
    try {
        // return res.send("get orders method") 
        const orders = await Order.findAll({include: {
            model: Product,
            attributes: []
        }})
        return res.status(200).json({
            message: 'Orders retreived!',
            orders : orders
        })

    } catch(err) {
        console.error('some error',err)
        return res.status(500).json({err})
    }
}


const getOrder = async (req,res) => {
    try {
        // return res.send("get order method")
        const id = req.params.id
        const order = await Order.findOne({
            where: { id },
            include: {
                model: Product,
                through: { attributes: [] }  // This will exclude the join table's columns
            }
        });
        return res.status(200).json({
            message: 'Order retreived!',
            order: order
        })

    } catch(err) {
        console.error('some error',err)
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
  



module.exports = {addOrder, editOrder, getOrders, getOrder, deleteOrder}