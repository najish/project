const path = require('path')


console.log(path.resolve(__dirname))
console.log(path.resolve(__dirname, 'uploads'))
console.log(path.resolve(__dirname, './uploads'))
console.log(path.resolve(__dirname, './uploads/'))