// seeders/seed.js
const sequelize = require('../config/database');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const User = require('../models/User')

const seedData = async () => {
  try {
    // First, check if data exists to avoid duplicate entries
    const existingProducts = await Product.findAll();
    const existingOrders = await Order.findAll();
    const existingUsers = await User.findAll()
    if (existingProducts.length > 0 && existingOrders.length > 0 > existingUsers.length > 0) {
      console.log('Data already exists!');
      return;
    }

    // Insert sample products (real-world product names and details)
    const products = await Product.bulkCreate([
      { name: 'Apple iPhone 14', description: 'Latest iPhone model with 5G support', price: 999, stockQuantity: 50 },
      { name: 'Samsung Galaxy S22', description: 'Android smartphone with 120Hz display', price: 849, stockQuantity: 30 },
      { name: 'Sony WH-1000XM5', description: 'Noise-canceling headphones with premium sound', price: 350, stockQuantity: 40 },
      { name: 'Dell XPS 13', description: 'Compact and powerful laptop with 16GB RAM', price: 1499, stockQuantity: 25 },
      { name: 'GoPro HERO10 Black', description: 'Waterproof action camera with 5.3K video', price: 499, stockQuantity: 15 },
      { name: 'Nike Air Max 270', description: 'Comfortable and stylish sneakers', price: 150, stockQuantity: 60 },
      { name: 'Amazon Echo Dot 4th Gen', description: 'Smart speaker with Alexa', price: 49, stockQuantity: 100 },
      { name: 'Nintendo Switch OLED', description: 'Portable gaming console with OLED screen', price: 349, stockQuantity: 35 },
      { name: 'Apple AirPods Pro 2', description: 'Wireless earbuds with active noise cancellation', price: 249, stockQuantity: 45 },
      { name: 'HP Envy 32 All-in-One', description: '32-inch 4K monitor with built-in PC', price: 1799, stockQuantity: 10 }
    ]);

    console.log('Products seeded successfully!');

    // Insert sample orders (real-world orders with multiple products)
    const order1 = await Order.create({ totalPrice: 1348, orderStatus: 'shipped' });
    const order2 = await Order.create({ totalPrice: 1998, orderStatus: 'delivered' });
    const order3 = await Order.create({ totalPrice: 449, orderStatus: 'pending' });

    console.log('Orders created successfully!');

    // Link products to the orders using OrderItem (realistic order details)
    await OrderItem.bulkCreate([
      // Order 1: iPhone 14 and WH-1000XM5 headphones
      { orderId: order1.id, productId: products[0].id, quantity: 1, totalPrice: products[0].price },
      { orderId: order1.id, productId: products[2].id, quantity: 1, totalPrice: products[2].price },

      // Order 2: Samsung Galaxy S22 and Nike Air Max 270
      { orderId: order2.id, productId: products[1].id, quantity: 1, totalPrice: products[1].price },
      { orderId: order2.id, productId: products[5].id, quantity: 1, totalPrice: products[5].price },

      // Order 3: GoPro HERO10 and Echo Dot
      { orderId: order3.id, productId: products[4].id, quantity: 1, totalPrice: products[4].price },
      { orderId: order3.id, productId: products[6].id, quantity: 1, totalPrice: products[6].price }
    ]);

    console.log('Order items seeded successfully!');

    const users = await User.bulkCreate([
        {
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'hashedpassword1', // Ideally, you would hash the password before storing it
        },
        {
          username: 'jane_smith',
          email: 'jane.smith@example.com',
          password: 'hashedpassword2',
        },
        {
          username: 'alex_jones',
          email: 'alex.jones@example.com',
          password: 'hashedpassword3',
        },
        {
          username: 'emily_wilson',
          email: 'emily.wilson@example.com',
          password: 'hashedpassword4',
        },
        {
          username: 'susan_brown',
          email: 'susan.brown@example.com',
          password: 'hashedpassword5',
        },
        {
          username:'najish.eqbal',
          email:'najish.eqbal@gmail.com',
          password:'$2b$10$5yJSF4tESdLrgjX9tejEL.PNtlQIrUOf/aDK8is.Um8BozFm8uiCi'
        }
      ]);


      console.log('Users added sucessfully!')

  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
