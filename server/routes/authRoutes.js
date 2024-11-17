const express = require('express')
const {signup, login} = require('../controllers/authController')
const authenticate = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/signup',signup)
router.post('/login', login)
router.get('/protected', authenticate, (req,res) => {
    res.json({message: `welcome, ${req.user.username}!`, user: req.user})
})

module.exports = router