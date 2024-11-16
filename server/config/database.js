const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('./config')
const environment = 'development'

const config = dbConfig[environment]





const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,  // Set to true if you want to see SQL queries in the console
});


sequelize.authenticate()
    .then(() => {
        console.log('Database connection sucessfully!')
    }).catch(err => {
        console.error('Database connection failed', err)
    })



module.exports = sequelize