const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Đăng ký tài khoản khách hàng
router.post("/register", authController.register);

// Đăng nhập
router.post("/login", authController.login);

module.exports = router;
