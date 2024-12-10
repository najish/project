const express = require('express')
const authRoutes = require('./authRoutes')
const cartRoutes = require('./cartRoutes')
const orderRoutes = require('./orderRoutes')
const productRoutes = require('./productRoutes')
const shippingRoutes = require('./shippingRoute')
const categoryRoutes = require('./categoryRoutes')


const router = express.Router()

router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/auth', authRoutes)


module.exports = router