const express = require("express");
const Agreement = require("../models/Agreement");
const router = express.Router();

router.post("/", async (req, res) => {
  const agreement = new Agreement(req.body);
  await agreement.save();
  res.status(201).json(agreement);
});

router.get("/", async (req, res) => {
  const agreements = await Agreement.find();
  res.json(agreements);
});

module.exports = router;
