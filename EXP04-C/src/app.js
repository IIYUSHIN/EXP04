// Express Application Setup — Configures middleware and mounts routes
// This file creates the Express app instance and connects the booking routes

const express = require("express");
const bookingRoutes = require("./modules/booking/booking.route");

// Create the Express application
const app = express();

// Middleware: Parse incoming JSON request bodies
// This allows req.body to contain the parsed JSON data from POST requests
app.use(express.json());

// Mount booking routes under /api prefix
// So POST /book/:seatId becomes POST /api/book/:seatId
app.use("/api", bookingRoutes);

module.exports = app;
