// Redis Configuration — Creates and connects the Redis client
// Redis is an in-memory data store used here for distributed locking

const { createClient } = require("redis");

// Create a Redis client that connects to localhost:6379 (default Docker Redis port)
const redisClient = createClient();

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
