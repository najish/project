const express = require('express');
const router = express.Router();
const { addOrder, editOrder, getOrder, getOrders, deleteOrder, placeOrder } = require('../controllers/orderController');

router
  .route('/')
  .get(getOrders)
  .post(addOrder);

router
  .route('/:id')
  .get(getOrder)
  .put(editOrder)
  .delete(deleteOrder);

router.route('/place')
    .post(placeOrder)

module.exports = router;
