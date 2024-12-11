const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()
const upload = require('../config/multerConfig')



router.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct)

router.route('/:id')
    .get(productController.getProduct)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)

module.exports = router