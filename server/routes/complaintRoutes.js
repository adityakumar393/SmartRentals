const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const { upload } = require("../config/cloudinary");


// POST complaint
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { text, user } = req.body;
    const imageUrl = req.file?.path || "";

    const complaint = new Complaint({ text, user, imageUrl });
    await complaint.save();

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// GET all complaints
router.get("/", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

// PATCH: Update complaint status
router.patch("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
