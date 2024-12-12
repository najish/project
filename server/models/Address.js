const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database')

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id"
    }
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
  tableName: 'Address'
});


module.exports = Address;
