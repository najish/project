const { Product } = require('../models/associations');
const asyncHandler = require('../middlewares/asyncHandler');
const redisClient = require('../config/redis')
// Get all products
exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.findAll();
    return res.status(200).json({
        message: 'Products are fetched successfully',
        products: products,
    });
});

// Get a single product by ID
exports.getProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id } });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({
        message: 'Product received!',
        product: product,
    });
});

// Add a new product
exports.addProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stockQuantity, categoryId } = req.body;

    if (!name || !price || !stockQuantity || !categoryId) {
        return res.status(400).json({ error: 'Name, price, stockQuantity, and categoryId are required' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Product image is required' });
    }

    const imageUrl = `uploads/productImages/${req.file.filename}`;

    const newProduct = await Product.create({
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
        categoryId,
    });

    return res.status(201).json({
        message: 'Product added successfully',
        product: newProduct,
    });
});

// Edit a product
exports.editProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, description, price, stockQuantity } = req.body;

    if (!name || !price || !stockQuantity) {
        return res.status(400).json({ error: 'Name, price, and stockQuantity are required' });
    }

    const product = await Product.findOne({ where: { id } });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({
        name,
        description,
        price,
        stockQuantity,
    });

    return res.status(200).json({
        message: 'Product updated successfully',
        product,
    });
});

// Delete a product
exports.deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();

    return res.status(200).json({ message: 'Product deleted successfully' });
});
