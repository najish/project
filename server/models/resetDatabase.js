const {sequelize,User, Cart, CartItem, Product, Category, Order, OrderItem, Address} = require('../models/associations')

const resetDatabase = async () => {
    try {
      // Disable foreign key checks to avoid constraint issues
    //   await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
      // Drop tables in the correct order (from child to parent)
      await OrderItem.drop(); // Drop child table first
      await CartItem.drop();
      await Address.drop(); // Drop Address table
      await Product.drop(); // Drop Product table
      await Cart.drop(); // Drop Cart table
      await Order.drop(); // Drop Order table
      await Category.drop(); // Drop Category table
      await User.drop(); // Drop User table
      // Re-enable foreign key checks after dropping tables
      // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('Database reset successfully!');
    } catch (error) {
    //   console.error('Error resetting database:', error);
    }
  };
  
module.exports = resetDatabase
  