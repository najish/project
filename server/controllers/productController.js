const Product = require('../models/Product')



exports.getProducts = async (req, res) => {
  try {
      // Wrapping setTimeout in a promise to delay the response
      await new Promise(resolve => setTimeout(resolve, 2000)); // 3-second delay

      // Fetching products from the database
      const products = await Product.findAll();

      // Sending the response after the delay
      return res.status(200).json({
          message: 'Products are fetched successfully',
          products: products
      });
  } catch (err) {
      console.error('Error get Products', err);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getProduct = async (req,res) => {
  try {
    const id = req.params.id
    const product = await Product.findOne({where: {id}})
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({
      message: 'Product Received!',
      product: product
    })
  } catch(err) {
    console.error('Error get product',err)
    return res.status(500).json({error: 'Internal Server Error'})
  }
}



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
        imageUrl: '/product.jpeg'
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

exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id; // Get product ID from request parameters
    const { name, description, price, stockQuantity } = req.body; // Extract fields from request body

    // Validate input data
    if (!name || !price || !stockQuantity) {
      return res.status(400).json({ error: 'Name, price, and stockQuantity are required' });
    }

    // Find the product by ID
    const product = await Product.findOne({ where: { id } });

    // If the product does not exist, return a 404 error
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product details
    await product.update({
      name,
      description,
      price,
      stockQuantity,
    });

    // Return success response
    return res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Error editing product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id; // Get the product ID from request parameters

    // Find the product by ID
    const product = await Product.findOne({ where: { id } });

    // If the product does not exist, return a 404 error
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product
    await product.destroy();

    // Return success response
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


    
