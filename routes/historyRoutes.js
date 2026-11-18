const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    getHistory,
    getHistoryById,
    deleteHistory,
    searchHistory,
    filterHistory

} = require("../controllers/historyController");

// Get all history
router.get("/", protect, getHistory);

// Search
router.get("/search", protect, searchHistory);

// Filter
router.get("/filter", protect, filterHistory);

// Get single
router.get("/:id", protect, getHistoryById);

// Delete
router.delete("/:id", protect, deleteHistory);

module.exports = router;