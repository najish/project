const {Sequelize} = require('sequelize')
const value = 1
const sequelize = new Sequelize('test','root', 'Zafer1998@', {
    port: 3306,
    host: 'localhost',
    dialect: 'mysql'
})

const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log('connect to database')
    } catch(err) {
        console.error(err)
    }
}


connectDb()
module.exports = {sequelize, value}