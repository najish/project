const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Address = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Addresses'
});


module.exports = Address;
