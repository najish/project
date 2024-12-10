const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory,
} = require('../controllers/categoryController');

// Get all categories
router.get('/', getCategories);

// Get a specific category by ID
router.get('/:id', getCategory);

// Add a new category
router.post('/', addCategory);

// Edit a category
router.put('/:id', editCategory);

// Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
