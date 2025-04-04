require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const incomeRoute = require("./routes/incomeRoute.js");
const expenseRoute = require("./routes/expenseRoute.js");
const dashboardRoute = require("./routes/dashboardRoute.js");
const path = require("path");
const swaggerDocs = require("./config/swagger");

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
swaggerDocs(app);

// Your existing routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/dashboard", dashboardRoute);

// upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));