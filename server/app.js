require('dotenv').config();
const path = require('path');
const fs = require('fs');
const https = require('https'); // Corrected to 'https' instead of 'httpsServer'
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const shippingRoute = require('./routes/shippingRoute');

// Database and models
const sequelize = require('./config/database');
require('./models/associations');
const {seedUserData} = require('./seeders/seed');

// Middleware configurations
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your client
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Enable cookies and other credentials
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Request logger
app.use(morgan('combined'));

// Body parsers
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON bodies

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for health check or testing
app.get('/', (req, res) => {
  res.send('Hello from server');
});

// Use routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);
app.use('/shipping', shippingRoute);

// Global error handler (always put this at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync database and seed data
sequelize.sync({ force: true }) // Use { alter: true } to automatically adjust the table schema for dev
  .then(() => {
    console.log('Database synced!');
    return seedUserData()
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Check if certificates exist before starting HTTPS server (uncomment to enable SSL)
// const privateKeyPath = path.join(__dirname, 'certs', 'key.pem');
// const certificatePath = path.join(__dirname, 'certs', 'certificate.crt');

// if (fs.existsSync(privateKeyPath) && fs.existsSync(certificatePath)) {
//   https.createServer({
//     key: fs.readFileSync(privateKeyPath), // No encoding specified for binary files
//     cert: fs.readFileSync(certificatePath) // No encoding specified for binary files
//   }, app).listen(PORT, () => {
//     console.log(`Server running on https://localhost:${PORT}`);
//   });
// } else {
//   console.error('SSL certificate files not found.');
//   process.exit(1); // Exit if certificates are not found
// }

// If not using HTTPS, listen on HTTP
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
