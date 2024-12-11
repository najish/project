require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {authenticate} = require('./config/database')
const { sequelize } = require('./models/associations');
const { seedAllModel } = require('./seeders/seed');
const apiRoutes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const asyncHandler = require('./middlewares/asyncHandler')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from server');
});

// API Routes
app.use('/api', apiRoutes);

// Test error route
app.get('/error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  error.status = 500;
  next(error); // Passes the error to the error handling middleware
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Database synchronization and seeding

// sequelize.authenticate().then(() => console.log('Connected')).catch(err => console.error(err))
asyncHandler(async () => {
  await authenticate()
  await sequelize.sync({force: true})
  console.log('database synced')
  await seedAllModel()
})

// Error handler middleware (should be the last one)


// Global error handler in app.js or server.js
app.use((err, req, res, next) => {
  console.error('Error:', err);  // Log the error
  res.status(500).json({ message: 'Internal Server Error' });  // Send a response
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
