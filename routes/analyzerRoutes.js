const express = require("express");

const router = express.Router();

const { analyzeJob } = require("../controllers/analyzerController");

const protect = require("../middleware/authMiddleware");

// Analyze Job
router.post("/analyze", protect, analyzeJob);

module.exports = router;