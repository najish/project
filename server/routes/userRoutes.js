const express = require('express')
const router = express.Router()
const {getUser, getUsers, editUser, deleteUser, addUser, randomUser} = require('../controllers/userController')


router.route('/')
    .get(getUsers)
    .post(addUser)

router.route('/:id')
    .get(getUser)
    .put(editUser)
    .delete(deleteUser)

router.route('/random',randomUser)    
module.exports = router