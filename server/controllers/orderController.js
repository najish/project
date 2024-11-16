const Order = require('../models/Order')
const Product = require('../models/Product')





const getOrders = async (req,res) => {
    try {
        // return res.send("get orders method") 
        const orders = await Order.findAll()
        return res.status(200).json({
            message: 'Orders retreived!',
            orders : orders
        })

    } catch(err) {
        console.error('some error',err)
        
    }
}


const getOrder = async (req,res) => {
    try {
        // return res.send("get order method")
        const id = req.params.id
        const order = await Order.findOne({
            where: { id },
            include: {
                model: Product,
                through: { attributes: [] }  // This will exclude the join table's columns
            }
        });
        return res.status(200).json({
            message: 'Order retreived!',
            order: order
        })

    } catch(err) {
        console.error('some error',err)
        return res.status(500).json(err)
    }
}

const addOrder = async (req,res) => {
    

    return res.send("hello from add order")
}

const editOrder = async (req,res) => {
    try {
        return res.send("edit order method")
        
    } catch(err) {
        console.error('some error',err)
        
    }
}
const deleteOrder = async (req,res) => {
    try {
        return res.send("add orders method")

    } catch(err) {
        console.error('some error',err)
        
    }
}



module.exports = {addOrder, editOrder, getOrders, getOrder, deleteOrder}