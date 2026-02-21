// Booking Service — Core business logic for seat booking with Redis locking
// This is where the locking magic happens!
// Flow: Acquire Lock → Check Seat → Book Seat → Release Lock

const { acquireLock, releaseLock } = require("../../utils/lock.util");
const { getSeatStatus, bookSeat } = require("./booking.model");

const bookSeatService = async (seatId) => {
    // Step 1: Create a unique lock key for this specific seat
    // Example: lock:seat:1, lock:seat:2, etc.
    const lockKey = `lock:seat:${seatId}`;

    // Step 2: Try to acquire the lock (10 second timeout)
    // If another request is already processing this seat, lockValue will be null
    const lockValue = await acquireLock(lockKey, 10);

    // Step 3: If lock was NOT acquired → someone else is booking this seat right now
    if (!lockValue) {
        return { status: 423, message: "Seat is currently locked. Try again." };
    }

    // Step 4: We got the lock! Now safely check and book the seat
    // Use try-finally to GUARANTEE the lock is released even if something crashes
    try {
        // Check if the seat exists
        const seatStatus = getSeatStatus(seatId);

        if (!seatStatus) {
            return { status: 404, message: "Seat not found." };
        }

        // Check if the seat is already booked
        if (seatStatus !== "available") {
            return { status: 400, message: "Seat already booked." };
        }

        // Seat is available — book it!
        bookSeat(seatId);

        return { status: 200, message: `Seat ${seatId} booked successfully.` };

    } finally {
        // Step 5: ALWAYS release the lock when done (success or failure)
        await releaseLock(lockKey, lockValue);
    }
};

module.exports = { bookSeatService };
