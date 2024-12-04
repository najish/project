const express = require('express')
const router = express.Router()


const {handleValidationErrors, validateShippingAddress} = require('../middlewares/shippingMiddleware')
const {addShippingAddress, getShippingAddress}  = require('../controllers/shippingController') 

// router.post('/', (req,res) =>{
//     console.log(req.body)
//     return res.json({
//         message: 'hello from shipping route',
//         body: req.body
//     })
// })


router.post('/', validateShippingAddress,handleValidationErrors,addShippingAddress )
router.get('/getShippingAddress', getShippingAddress)

module.exports = router