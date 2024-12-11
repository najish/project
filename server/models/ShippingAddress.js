const {sequelize} = require('../config/database');
const { DataTypes } = require('sequelize');

const ShippingAddress = sequelize.define('shippingAddress', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING, // Changed from INTEGER to STRING
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'ShippingAddress',
});

module.exports = ShippingAddress;
