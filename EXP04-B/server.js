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

app.use("/api/cards", require("./routes/cardRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
