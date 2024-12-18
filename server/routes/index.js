const express = require('express');
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes')
const userRoutes = require('./userRoutes')
const cartRoutes = require('./cartRoutes')
const authRoutes = require('./authRoutes')
const addressRoutes = require('./addressRoutes')




const router = express.Router();

router.use('/products', productRoutes);  
router.use('/categories', categoryRoutes)
router.use('/users', userRoutes)
router.use('/carts',cartRoutes)
router.use('/auth', authRoutes)
router.use('/address',addressRoutes)

module.exports = router;
