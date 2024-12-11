const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database')


const Shifa = sequelize.define('Shifa',{
    name: {
        type:DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Shifa'
})

module.exports = Shifa