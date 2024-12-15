const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadDir = path.resolve(__dirname, "../uploads/productImages")

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
} 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Use original file extension
    },
})


const upload = multer({storage, limits: {fileSize: 5 * 1024 * 1024}})


module.exports = upload