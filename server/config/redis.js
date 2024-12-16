const { createClient } = require('redis');

// Create the Redis client
const redisClient = createClient({
    url: 'redis://localhost:6379', // Replace with your Redis server URL
});

// Handle connection events
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Connect to the Redis server
(async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected successfully');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();


module.exports = redisClient