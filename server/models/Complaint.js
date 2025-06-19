const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: String, // For now just store a name or user ID
  text: String,
  imageUrl: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  urgency: {
  type: String,
  enum: ['Low', 'Medium', 'High'],
  default: 'Medium',
},

});

module.exports = mongoose.model("Complaint", complaintSchema);