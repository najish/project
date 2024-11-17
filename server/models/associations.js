const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

// User associations
User.hasMany(Cart);        // A user can have many carts
Cart.belongsTo(User);      // A cart belongs to one user

User.hasMany(Order);       // A user can have many orders
Order.belongsTo(User);     // An order belongs to one user

// Cart associations
Cart.belongsTo(User);      // A cart belongs to one user
Cart.hasMany(CartItem, {   // A cart can have many cart items
    foreignKey: 'cartId',
    onDelete: 'CASCADE',
});
CartItem.belongsTo(Cart, { // A cart item belongs to a cart
    foreignKey: 'cartId',
});

// Cart-Product Many-to-Many association
Cart.belongsToMany(Product, { through: 'CartProduct' });  // A cart can contain multiple products
Product.belongsToMany(Cart, { through: 'CartProduct' });  // A product can belong to many carts

// Order associations
Order.belongsTo(User);     // An order belongs to one user
User.hasMany(Order);       // A user can have many orders

Order.belongsToMany(Product, { through: 'OrderProduct' }); // An order can contain multiple products
Product.belongsToMany(Order, { through: 'OrderProduct' }); // A product can belong to many orders




module.exports = () => {
    // Sync models (optional to run here if centralizing sync in config)
    User.sync();
    Cart.sync();
    Product.sync();
    Order.sync();
};
