const User = require('../models/User')
const Cart = require('../models/Cart')


User.hasOne(Cart, { 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'  
})
Cart.belongsTo(User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})



module.exports = {User, Cart}

