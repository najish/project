const {sequelize} = require('../config/database')
const User = require('./User')
const Another = require('./Another')
const Address = require('./Address')
const Cart = require('./Cart')
const CartItem = require('./CartItem')
const Category = require('./Category')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Product = require('./Product')
const Shifa = require('./Shifa')
const ShippingAddress = require('./ShippingAddress')
const asyncHandler = require('../middlewares/asyncHandler')

// Category and Product

Category.hasMany(Product, {foreignKey: "categoryId", as: "products"})
Product.belongsTo(Category, {foreignKey: "categoryId", as: "categories"})





module.exports = {sequelize, User, Cart, CartItem, Product, Category, Another, Order, OrderItem, Shifa, ShippingAddress, Address}