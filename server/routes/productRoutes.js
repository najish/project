const express = require('express')
const { getProducts, getProduct, addProduct, editProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()


router.get('/',getProducts)
router.get('/:id',getProduct)
router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)

module.exports = router