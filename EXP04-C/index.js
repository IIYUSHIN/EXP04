// Entry Point — Starts the server and connects to Redis
// This file is the first thing that runs when you do: npm run EXP04-C

const app = require("./src/app");
const { connectRedis } = require("./src/config/redis");

const PORT = 3000;

// Start the server by first connecting to Redis, then listening for HTTP requests
const startServer = async () => {
    // Connect to Redis (must be running via Docker first!)
    await connectRedis();

    // Start listening for HTTP requests
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();
