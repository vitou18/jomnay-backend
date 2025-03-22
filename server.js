require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const incomeRoute = require("./routes/incomeRoute.js");
const path = require("path");

// Connect db
connectDb();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoute);

// upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
