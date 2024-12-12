require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { authenticate } = require('./config/database');
const { sequelize } = require('./models/associations');
const { seedAllModel } = require('./seeders/seed');
const apiRoutes = require('./routes/index');
const globalErrorHandler = require('./middlewares/errorMiddleware');
const { NotFoundError } = require('./utils/errors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(morgan('dev'));
app.use(cors({
}));

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.use('/api', apiRoutes);

// Test error route
app.get('/error', (req, res, next) => {
    try {
        throw new NotFoundError('This route does not exist');
    } catch (err) {
        next(err);
    }
});

// Handle unhandled routes (404)
app.all('*', (req, res, next) => {
    next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Global error handler
app.use(globalErrorHandler);

// Database and server startup
const startApp = async () => {
    try {
        await authenticate();
        console.log('Database authenticated');

        await sequelize.sync({ alter: true }); // Avoid force: true in production
        console.log('Database synced');

        await seedAllModel();
        console.log('Database seeded');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            console.log('Shutting down gracefully...');
            await sequelize.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Error during startup:', error);
        process.exit(1);
    }
};



startApp();