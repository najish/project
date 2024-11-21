const jwt = require('jsonwebtoken')
const JWT_SECRET = 'MY_JWT_SECRET'


const authenticate = (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'Access denied. No token provided'})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        console.log(decoded)
        next()

    } catch(err) {
        res.status(400).json({error: 'Invalid token'})
    }
}

module.exports = authenticate




