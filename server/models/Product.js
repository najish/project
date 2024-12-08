const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'products',
    timestamps: false
})

module.exports = Product