const { DataTypes } = require('sequelize')
const {sequelize} = require('../config/database')
const Category = require('./Category')


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
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "categories",
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    tableName: 'products',
    timestamps: false
})

module.exports = Product