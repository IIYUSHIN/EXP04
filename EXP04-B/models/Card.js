const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  suit: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Card", cardSchema);
