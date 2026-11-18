const express = require("express");
const router = express.Router();

const {
register,
login,
profile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

// Test Route
router.get("/test", (req, res) => {
console.log("✅ TEST ROUTE HIT");
res.json({
    success: true,
    message: "Auth Route Working"
});
});

router.get("/profile", protect, profile);

module.exports = router;