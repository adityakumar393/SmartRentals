const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema({
  tenant: String,
  landlord: String,
  terms: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Agreement", agreementSchema);
