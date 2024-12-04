const User = require('../models/User')
const fs = require('fs').promises
const path = require('path')

const readFileData = async(fileName) => {
    try {
        const filePath = path.join(__dirname, "Data", fileName)
        const data = await fs.readFile(filePath, 'utf8')
        return JSON.parse(data) 
    } catch(err) {
        console.error(fileName, err)
    }
}

const seedData = async (model, fileName) => {
    try {
        const data = await readFileData(fileName)
        await model.bulkCreate(data)
        console.log(`${fileName} data seeded!`)
    } catch(err) {
        console.error(err)
    }   
}



const seedUserData = async () => {
    
}



module.exports = {seedUserData}