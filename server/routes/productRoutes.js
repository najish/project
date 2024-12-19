const express = require('express')
const router = express.Router()


const {productController} = require('../controllers')
const upload = require('../config/multerConfig')
const {productValidation, handleValidationErrors} = require('../middlewares/validations/productValidation')


router.route('/')
    .get(productController.getProducts)
    .post(upload.single('image'),productController.addProduct)

router.route('/:id')
    .get(productController.getProduct)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)


router.get('/new',productController.newProduct)


router.route('/pagination/:currentPage')
    .get(productController.getProductsPagination)

module.exports = router