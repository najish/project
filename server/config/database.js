const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('./config');
const asyncHandler = require('../middlewares/asyncHandler');
const environment = 'development'

const config = dbConfig[environment]





const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: true,  // Set to true if you want to see SQL queries in the console
});


const authenticate = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection established')
    } catch (err) {
        console.error("Failed To Connect",err)
    }
}


// const authenticate = asyncHandler(async () => {
//     await sequelize.authenticate()
//     console.log('connection established')
// })


module.exports = {sequelize, authenticate}