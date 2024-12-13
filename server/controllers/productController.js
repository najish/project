const asyncHandler = require('../middlewares/asyncHandler');
const { Product } = require('../models/associations');

const getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.findAll();
    res.json(products);
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

    res.json({ message: 'Product deleted successfully' });
});

const newProduct = asyncHandler(async (req,res,next) => {
    // throw new Error('this is customer error')
    return res.send("Hello from new product")
})

module.exports = { getProduct, getProducts, addProduct, editProduct, deleteProduct,newProduct };