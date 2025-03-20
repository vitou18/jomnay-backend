require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.js");

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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
