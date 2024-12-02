const express = require("express");
const {
  register,
  login,
  getadmins,
} = require("../controllers/admin_controller");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

// Admin Routes
router.post("/register", register);
router.post("/login", login);
router.get("/get-admin", getadmins);

module.exports = router;
