require('dotenv').config(); // 1. Load environment variables

const express = require('express');
const morgan = require('morgan'); // For logging requests
const helmet = require('helmet'); // For setting security headers
const cors = require('cors'); // For enabling CORS
const { NotFoundError, DatabaseError } = require('./utils/errors');
const globalErrorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Importing routes
const apiRoutes = require('./routes')
const { sequelize } = require('./models/associations');
const { seedAllModel } = require('./seeders/seed');
const asyncHandler = require('./middlewares/asyncHandler');

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests

// // Routes
// app.use('/products', productRoutes);
// app.use('/users', userRoutes);

app.use('/api',apiRoutes)

// Test route
app.get('/', (req, res, next) => {
    return res.send("Hello, world!");
});

// Example route to trigger an error
app.get('/error', (req, res, next) => {
  next(new NotFoundError('Route Not Found'));
});

// Catch-all 404 for undefined routes
app.all('*', (req, res, next) => {
  console.log('hello ');
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server!`));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Database synchronization and seeding
const syncDatabase = asyncHandler(async () => {
  await sequelize.authenticate();
  console.log('Database connected 🔗🔗🔗');
  await sequelize.sync({force: true})
  await seedAllModel(); // Seed data if necessary
});

// Sync database before starting the server
syncDatabase().then(() => {
  // Start the server after the database is connected
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});
