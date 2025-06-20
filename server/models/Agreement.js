const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema({
  landlord: { type: String, required: true },
  tenant: { type: String, required: true },
  property: { type: String, required: true },
  rent: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Agreement", agreementSchema);
