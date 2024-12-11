const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database'); // Replace with your actual Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true, // Nullable for OAuth users
    },

    role : {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // Ensure no duplicate Google IDs
    },
    
    facebookId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // Ensure no duplicate Facebook IDs
    },
    profilePicture: {
        type: DataTypes.STRING, // Optional field for user profile pictures
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'users', // Explicit table name
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = User;
