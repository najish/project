const express = require('express');
const app = express();
const PORT = 5000;
const morgan = require('morgan');

// Adding Routes here
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const sequelize = require('./config/database');

require('./models/associations');
const seedsData = require('./seeders/seed')

// Sync database
sequelize.sync({ force: true }) // Use { alter: true } to automatically adjust the table schema for dev
  .then(() => {
    console.log('Database synced!');
    seedsData()
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Middlewares
app.use(morgan('combined')); // Request logger
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON bodies

// Basic route for health check or testing
app.get('/', (req, res) => {
  res.send('Hello from server');
});

// Use routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});


