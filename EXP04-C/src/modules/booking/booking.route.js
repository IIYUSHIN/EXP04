// Booking Routes — Defines the API endpoint for seat booking
// Only one route: POST /book/:seatId

const express = require("express");
const router = express.Router();
const { bookSeatController } = require("./booking.controller");
const { getAllSeats } = require("./booking.model");

// GET /api/seats — Get all seat statuses
router.get("/seats", (req, res) => {
    res.json(getAllSeats());
});

// POST /api/book/:seatId — Book a seat by its ID
// :seatId is a URL parameter (e.g., /api/book/1, /api/book/2, etc.)
router.post("/book/:seatId", bookSeatController);

module.exports = router;
