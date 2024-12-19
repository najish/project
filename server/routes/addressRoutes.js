const express = require('express')
const router = express.Router()
const {getAddresses, getAddress, addAddress, editAddress, deleteAddress, getUserAddress} = require('../controllers/addressController')

router.route('/')
    .get(getAddresses)
    .post(addAddress)


router.route('/:id')
    .get(getAddress)
    .put(editAddress)
    .delete(deleteAddress)


router.route('/user/:id')
    .get(getUserAddress)

module.exports = router