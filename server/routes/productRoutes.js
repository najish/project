const express = require('express')
const router = express.Router()


const {getProduct, getProducts, addProduct, editProduct, deleteProduct,newProduct} = require('../controllers/productController')
const upload = require('../config/multerConfig')
const {productValidation, handleValidationErrors} = require('../middlewares/validations/productValidation')


router.route('/')
    .get(getProducts)
    .post(productValidation(),handleValidationErrors,upload.single('image'),addProduct)

router.route('/:id')
    .get(getProduct)
    .put(editProduct)
    .delete(deleteProduct)


router.get('/new',newProduct)

module.exports = router