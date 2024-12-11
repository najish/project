const {sequelize} = require('../config/database')
const {DataTypes} = require('sequelize')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
    
}, {
    tableName: 'categories',
    timestamps: true
})


module.exports = Category