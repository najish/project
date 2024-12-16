const asyncHandler = require('../middlewares/asyncHandler');
const { Product } = require('../models/associations');
const redisClient = require('../config/redis')
const getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

const getProducts = asyncHandler(async (req, res, next) => {
    const cacheKey = 'products'
    const cachedData = await redisClient.get(cacheKey)

    if(cachedData) {
        return res.status(200).json(JSON.parse(cachedData))
    }
    else {
        const products = await Product.findAll();
        await redisClient.setEx(cacheKey,10 ,JSON.stringify(products))
        return res.status(200).json(products);
    }
});

const addProduct = asyncHandler(async (req, res, next) => {
    const { name, description, price } = req.body;

    const newProduct = await Product.create({
        name,
        description,
        price
    });

    res.status(201).json(newProduct);
});

const editProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    console.log("hello")

    await product.save();


    res.json(product);
});

const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    console.log("hello")
    res.json({ message: 'Product deleted successfully' });
});

const newProduct = asyncHandler(async (req,res,next) => {
    return res.send("Hello from new product")
})

module.exports = { getProduct, getProducts, addProduct, editProduct, deleteProduct,newProduct };