const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://wallet-app-frontend-0y5l.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes (after middlewares!)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/family", require("./routes/familyRoutes"));

module.exports = app;
