const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Đăng ký tài khoản 
router.post("/register", authController.register);

// Đăng nhập
router.post("/login", authController.login);

// Lấy thông tin người dùng hiện tại
router.get("/current", authController.authMiddleware, authController.getCurrentUser);

module.exports = router;