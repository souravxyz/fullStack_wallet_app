const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// CORS config (add Render frontend domain if you have one)
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images (local uploads folder)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/family", require("./routes/familyRoutes"));

module.exports = app;
