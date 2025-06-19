const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const agreementRoutes = require("./routes/agreementRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// ✅ Setup CORS correctly (do NOT repeat it below)
app.use(cors({
  origin: true,
  credentials: true
}));


// Middleware to handle JSON & form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/agreements", agreementRoutes);
app.use("/api/complaints", complaintRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
