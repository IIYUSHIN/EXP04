const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load .env from the SAME folder as this server.js file
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to MongoDB Atlas
connectDB();

const app = express();
app.use(express.json());

// Root route — shows a welcome message when visiting the base URL
app.get("/", (req, res) => {
  res.json({
    message: "EXP04-B: Playing Card Collection API",
    endpoints: {
      "GET /api/cards": "Get all cards",
      "POST /api/cards": "Create a new card",
      "PUT /api/cards/:id": "Update a card",
      "DELETE /api/cards/:id": "Delete a card"
    }
  });
});

app.use("/api/cards", require("./routes/cardRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
