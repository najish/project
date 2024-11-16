const express = require('express')
const router = express.Router()
const {addOrder, editOrder, getOrder, getOrders, deleteOrder} = require('../controllers/orderController')


router.get('/', getOrders)
router.get('/:id', getOrder)

router.post('/add', addOrder)
router.put('/edit', editOrder)
router.delete('/', deleteOrder)

module.exports = router