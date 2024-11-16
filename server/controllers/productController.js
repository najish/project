const Product = require('../models/Product')

exports.addProduct = async (req,res) => {
    try {
        const { name, description, price, stockQuantity } = req.body;
    
        // Validate request
        if (!name || !price || !stockQuantity) {
          return res.status(400).json({ error: 'Name, price, and stockQuantity are required' });
        }
    
        // Add product to database
        const newProduct = await Product.create({
          name,
          description,
          price,
          stockQuantity,
        });
    
        return res.status(201).json({
          message: 'Product added successfully',
          product: newProduct,
        });
      } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}


exports.getProducts = async (req,res) => {
    try {
      const products = await Product.findAll()
      return res.status(200).json({
        message: 'Products are fetched successfully',
        products: products
      })
    } catch(err) {
      console.error('Error get Product',err)
      return res.status(500).json({error: 'Internal Server Error'})
    }
}





    
