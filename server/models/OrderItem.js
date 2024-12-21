const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'orders', // Name of the Orders table
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products', // Name of the Products table
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type:DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'order_items',
  timestamps: false,
});

module.exports = OrderItem;
