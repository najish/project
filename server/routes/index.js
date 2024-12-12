const express = require('express')
const authRoutes = require('./authRoutes')
const cartRoutes = require('./cartRoutes')
const orderRoutes = require('./orderRoutes')
const productRoutes = require('./productRoutes')
const shippingRoutes = require('./shippingRoute')
const categoryRoutes = require('./categoryRoutes')
const { NotFoundError } = require('../utils/errors')


const router = express.Router()

router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/auth', authRoutes)

router.use('*',(req,res,next) => {
    next(new NotFoundError(`Cannot find ${req.method} ${req.originalUrl} on this server!`))
})

module.exports = router