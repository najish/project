const {sequelize, authenticate} = require('../config/database')
const User = require('./User')
const Address = require('./Address')
const Cart = require('./Cart')
const CartItem = require('./CartItem')
const Category = require('./Category')
const Order = require('./Order')
const OrderItem = require('./OrderItem')
const Product = require('./Product')
const asyncHandler = require('../middlewares/asyncHandler')
const setupAssociations = require('./setupAssociation')



setupAssociations({User, Cart, CartItem, Product, Category, Order, OrderItem, Address})


module.exports = {sequelize, User, Cart, CartItem, Product, Category, Order, OrderItem, Address}