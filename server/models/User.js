const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
            isEmail: true, // Ensure email is in valid format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    tableName: 'users',
    timestamps: false
})

module.exports = User