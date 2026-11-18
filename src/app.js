const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const authRoutes = require("../routes/authRoutes");
const analyzerRoutes = require("../routes/analyzerRoutes");
const historyRoutes = require("../routes/historyRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");

const app = express();

// =======================
// Middlewares
// =======================

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/analyzer", analyzerRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);
// =======================
// Root Route
// =======================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "JobShield AI Backend",
        version: "1.0.0",
        message: "🚀 Backend Running Successfully"
    });
});

// =======================
// Health Check
// =======================

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Healthy",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});





// =======================
// Unknown Routes
// =======================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

module.exports = app;