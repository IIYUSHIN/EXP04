// Booking Model — In-memory seat data (simulated database)
// In a real application, this would use MongoDB or another database
// For this experiment, we use a simple JavaScript object that resets on server restart

// 5 seats, all initially "available"
let seats = {
    "1": "available",
    "2": "available",
    "3": "available",
    "4": "available",
    "5": "available"
};

// Get the current status of a seat ("available", "booked", or undefined if seat doesn't exist)
const getSeatStatus = (seatId) => {
    return seats[seatId];
};

// Mark a seat as "booked"
const bookSeat = (seatId) => {
    seats[seatId] = "booked";
};

module.exports = { getSeatStatus, bookSeat };
