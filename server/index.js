const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const agreementRoutes = require("./routes/agreementRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// ✅ Proper CORS setup for frontend-backend communication
app.use(cors({
  origin: true,
  credentials: true
}));

// ✅ Middleware to parse JSON & form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/agreements", agreementRoutes);
app.use("/api/complaints", complaintRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
