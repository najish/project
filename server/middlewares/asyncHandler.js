const fs = require('fs/promises')
const asyncHandler = async (func) => {
    return func().catch(err => console.error(err.message,err))
}


module.exports = asyncHandler