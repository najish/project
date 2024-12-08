const express = require('express');
const app = express();
const path = require('path'); // Ensure 'path' is imported before use
const PORT = 5000;
const morgan = require('morgan');
const cors = require('cors');

// Adding Routes here
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const sequelize = require('./config/database');
require('./models/associations');
const seedsData = require('./seeders/seed');

// Sync database and seed data
sequelize.sync({ force: true }) // Use { alter: true } to automatically adjust the table schema for dev
  .then(() => {
    console.log('Database synced!');
    seedsData(); // Seed the database after sync
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your client
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Enable cookies and other credentials
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Request logger
app.use(morgan('combined'));

// Body parsers
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

// Global error handler (always put this at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});


