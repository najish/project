const express = require('express')
const app = express()
const PORT = 5000

app.get('/',(req,res) => {
    res.send('Hello from server')
})


app.listen(PORT,() => {
    console.log(`server is running at PORT : ${PORT}`)
})