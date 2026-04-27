// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getProfile, updateProfile } = require("../controllers/userControllers");

// GET /api/user/profile (protected)
router.get("/profile", protect, getProfile);

// PUT /api/user/profile (protected)
router.put("/profile", protect, updateProfile);

module.exports = router;