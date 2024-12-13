require('dotenv').config();
const express = require('express');
const morgan = require('morgan'); // For logging requests
const helmet = require('helmet'); // For setting security headers
const cors = require('cors'); // For enabling CORS
const { NotFoundError , DatabaseError} = require('./utils/errors');
const globalErrorHandler = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// importing routes and middlewares

const productRoutes = require('./routes/productRoutes')



// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests




// Test route
app.get('/', (req, res,next) => {
    const test = false
    if(test) {
        return res.send("Hello, world!");
    }
    else {
        next(new DatabaseError())
    }
});

app.use('/products',productRoutes)

// Example route to trigger an error
app.get('/error', (req, res, next) => {
    next(new NotFoundError('Route Not Found'));
});

// Catch-all 404 for undefined routes
app.all('*', (req, res, next) => {
    console.log('hello ')
    next(new NotFoundError(`Cannot find ${req.originalUrl} on this server!`));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});


