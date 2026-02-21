// Booking Controller — Handles HTTP request/response for seat booking
// The controller's job is simple: extract data from the request,
// call the service (business logic), and send back the response

const { bookSeatService } = require("./booking.service");

const bookSeatController = async (req, res) => {
    // Extract the seat ID from the URL parameter (e.g., /api/book/3 → seatId = "3")
    const seatId = req.params.seatId;

    // Call the service to handle the booking logic (locking, checking, booking)
    const result = await bookSeatService(seatId);

    // Send the response with the appropriate status code and message
    return res.status(result.status).json({
        message: result.message
    });
};

module.exports = { bookSeatController };
