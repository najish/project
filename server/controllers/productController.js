const { Product } = require('../models/associations');
const asyncHandler = require('../middlewares/asyncHandler');
const redisClient = require('../config/redis');
const { NotFoundError, BadRequestError } = require('../utils/errors'); // Import custom error classes

// Get all products
exports.getProducts = asyncHandler(async (req, res) => {
    const cacheKey = 'products';
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json({
            message: "Data received from Redis",
            data: JSON.parse(cachedData),
        });
    }

    const products = await Product.findAll();

    await redisClient.setex(cacheKey, 100, JSON.stringify(products));

    return res.status(200).json({
        message: 'Products fetched successfully',
        products,
    });
});

// Get a single product by ID
exports.getProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const cacheKey = `product:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json({
            message: 'Data received from Redis',
            data: JSON.parse(cachedData),
        });
    }

    const product = await Product.findByPk(id); // Use findByPk for simpler ID lookup

    if (!product) {
        return next(new NotFoundError('Product not found')); // Use next() for error handling
    }

    await redisClient.setex(cacheKey, 10, JSON.stringify(product));

    return res.status(200).json({
        message: 'Product received!',
        product,
    });
});

// Add a new product
exports.addProduct = asyncHandler(async (req, res, next) => {
    try {
        const { error, value } = productSchema.validate(req.body); // Validate input
        if (error) {
            return next(new BadRequestError(error.details[0].message));
        }

        if (!req.file) {
            return next(new BadRequestError('Product image is required'));
        }

        const imageUrl = `uploads/productImages/${req.file.filename}`;

        const newProduct = await Product.create({ ...value, imageUrl }); // Use validated value
        await redisClient.del('products');

        return res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        next(error);
    }
});

// Edit a product
exports.editProduct = asyncHandler(async (req, res, next) => {
    try {
        const { error, value } = productUpdateSchema.validate(req.body);
        if (error) {
            return next(new BadRequestError(error.details[0].message));
        }
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
            return next(new NotFoundError('Product not found'));
        }

        await product.update(value);
        await redisClient.del(`product:${id}`);
        await redisClient.del('products');

        return res.status(200).json({
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        next(error);
    }
});

// Delete a product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
        return next(new NotFoundError('Product not found'));
    }

    await product.destroy();
    await redisClient.del(`product:${id}`);
    await redisClient.del('products');

    return res.status(200).json({ message: 'Product deleted successfully' });
});