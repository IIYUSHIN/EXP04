// Redis Configuration — Creates and connects the Redis client
// Redis is an in-memory data store used here for distributed locking

const { createClient } = require("redis");

// Create a Redis client
// - Locally: connects to localhost:6379 (Docker Redis)
// - On Railway: connects to cloud Redis via REDIS_URL environment variable
const redisClient = createClient(
    process.env.REDIS_URL ? { url: process.env.REDIS_URL } : {}
);

// Log any Redis connection errors to the console
redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

// Function to connect to Redis — called before starting the server
const connectRedis = async () => {
    await redisClient.connect();
    console.log("✅ Redis Connected");
};

module.exports = { redisClient, connectRedis };
