const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// CRUD
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/current", authController.authMiddleware, authController.getCurrentUser);

module.exports = router;