const wrapAsync = (fn) => {
    return async (...args) => {
        try {
            await fn(...args)
        } catch(err) {
            console.error('Error occured!', err) 
            throw err
        }
    }
}

module.exports = wrapAsync