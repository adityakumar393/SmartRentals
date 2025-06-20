const express = require("express");
const router = express.Router();
const Agreement = require("../models/Agreement");

// POST: Create a new rental agreement
router.post("/", async (req, res) => {
  try {
    const agreement = new Agreement(req.body);
    await agreement.save();
    res.status(201).json(agreement);
  } catch (err) {
    console.error("Error saving agreement:", err);
    res.status(500).json({ message: "Failed to save agreement" });
  }
});

// GET: Fetch all agreements (for dashboard)
router.get("/", async (req, res) => {
  try {
    const agreements = await Agreement.find().sort({ createdAt: -1 });
    res.json(agreements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch agreements" });
  }
});

// POST new agreement
router.post("/", async (req, res) => {
  try {
    const agreement = new Agreement(req.body);
    await agreement.save();
    res.status(201).json(agreement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all agreements
router.get("/", async (req, res) => {
  try {
    const agreements = await Agreement.find().sort({ createdAt: -1 });
    res.json(agreements);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE agreement
router.delete("/:id", async (req, res) => {
  try {
    await Agreement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting agreement" });
  }
});

module.exports = router;
