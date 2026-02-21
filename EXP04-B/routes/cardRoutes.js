const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

/* CREATE a card */
router.post("/", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* READ all cards */
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* READ single card by ID */
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* UPDATE a card */
router.put("/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* DELETE a card */
router.delete("/:id", async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) return res.status(404).json({ error: "Card not found" });
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
