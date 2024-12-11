const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Cart = require('./Cart');  // Importing Cart model for association

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {  // Assuming each cart item is associated with a product
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {  // Quantity of the product in the cart
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  price: {  // Price of the product in the cart
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cartId: {  // Foreign key to reference Cart
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'cart_items',
  timestamps: true,  // to track created and updated timestamps
});

// Setting up the association with Cart model
CartItem.belongsTo(Cart, {
  foreignKey: 'cartId',  // Foreign key field in the cart_items table
  onDelete: 'CASCADE',   // Cascade delete CartItems when Cart is deleted
});

module.exports = CartItem;
