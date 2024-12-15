const express = require('express');
const router = express.Router();
const { addOrder, editOrder, getOrder, getOrders, deleteOrder } = require('../controllers/orderController');

router
  .route('/')
  .get(getOrders)
  .post(addOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(editOrder)
  .delete(deleteOrder);

module.exports = router;
