const { Category } = require('../models/associations');
const redisClient = require('../config/redis')
// Get all categories
const getCategories = async (req, res) => {
    try {
        const cacheKey = 'categories'
        const cachedData = await redisClient.get(cacheKey)

        if (cachedData) {
            return res.status(200).json({
                message: 'data return from redis',
                data: JSON.parse(cachedData)
            })
        }
        const categories = await Category.findAll();
        await redisClient.setex(cacheKey, 10, JSON.stringify(categories))
        return res.json({
            message: 'Categories data have fetched!',
            categories
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single category by ID
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheKey = `category:${id}`

        const cachedData = await redisClient.get(cacheKey)
        if (cachedData) {
            return res.status(200).json({
                message: "data send from redis",
                data: JSON.parse(cachedData)
            })
        }
        const category = await Category.findByPk(id);
        await redisClient.setex(cacheKey, 10, JSON.stringify(category))
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.json(category);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Add a new category
const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const newCategory = await Category.create({ categoryName, description });
        return res.status(201).json(newCategory);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Edit a category
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        category.name = name;
        await category.save();

        return res.json(category);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        return res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory,
};
