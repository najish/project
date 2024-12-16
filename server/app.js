require('dotenv').config(); // 1. Load environment variables

const express = require('express');
const morgan = require('morgan'); // For logging requests
const helmet = require('helmet'); // For setting security headers
const cors = require('cors');
const rateLimit = require('express-rate-limit') // For enabling CORS
const { NotFoundError, DatabaseError } = require('./utils/errors');
const globalErrorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Importing routes
const apiRoutes = require('./routes');
const { sequelize } = require('./models/associations');
const { seedAllModel } = require('./seeders/seed');
const asyncHandler = require('./middlewares/asyncHandler');

// Middleware

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again after 15 minutes',
// });


app.use(express.json()); // Parse incoming JSON requests
app.use(helmet()); // Security middleware
app.use(morgan('dev')); // Log HTTP requests
// app.use(limiter)
// CORS setup: Allow only specific origin (e.g., React app running on localhost:3000)
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow only requests from React app
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // Allow cookies or authentication headers
// }));



app.use(cors())

// Remove the restrictive Cross-Origin-Resource-Policy header
// This will allow cross-origin access to resources
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow cross-origin resource sharing
  next();
});

app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api', apiRoutes);

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
  next(new NotFoundError(`Cannot find ${req.originalUrl} on this server!`));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Database synchronization and seeding
const syncDatabase = asyncHandler(async () => {
  await sequelize.authenticate();
  console.log('Database connected 🔗🔗🔗');
  await sequelize.sync({ force: true }); // Force sync the database (use carefully)
  console.log('All models are synched ✅✅✅');
  await seedAbllModel(); // Seed data if necessary
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
