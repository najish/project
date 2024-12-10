require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the uploads folder exists or create it
// const uploadDir = path.resolve(__dirname, './uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
// } else {
//   console.log('folder already exists')
// }

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // Files will be saved to the 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Unique file names
//   },
// });

// // Multer configuration with file size and file type restrictions
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
// });

// ===================== Middleware Setup =====================

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only your client
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true, // Enable cookies and other credentials
  })
);

// Security headers for enhanced security
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Serve static files from 'uploads' and 'public'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/image',express.static(path.join(__dirname, 'image')))
// Request logging with Morgan
app.use(morgan('combined'));

// Body parsers for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== Routes =====================

// Health check route
app.get('/', (req, res) => {
  res.send('Hello from server');
});

// File upload route
// app.post('/uploads', upload.single('image'), (req, res) => {
//   console.log(req.file)
//   console.log(req.body)
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }
//   console.log(req.file); // Log file details (for debugging)
//   res.send('File uploaded successfully');
// });

// API routes
const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

// ===================== Database Sync and Seeding =====================

const { sequelize } = require('./models/associations');
const { seedAllModel } = require('./seeders/seed');
const errorHandler = require('./middlewares/errorHandler');

sequelize
  .sync({ force: true }) // Use { alter: true } for dev; change to { force: true } to reset DB
  .then(() => {
    console.log('Database synced!');
    return seedAllModel();
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// ===================== Global Error Handling =====================

// Custom error handler for application-specific errors
app.use(errorHandler);

// Default error handler for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ===================== Server Startup =====================

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
