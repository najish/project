const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userEmail: {  // Changed from userId to userEmail
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',  // active means the user is still shopping
    allowNull: false,
  }
}, {
  tableName: 'carts',
  timestamps: false,
});

module.exports = Cart;
