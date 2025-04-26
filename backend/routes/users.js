const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Lấy thông tin người dùng
router.get("/me", auth, userController.getUserProfile);

// Tìm kiếm người dùng theo tên (chỉ dành cho admin)
router.get("/search", auth, userController.searchUsers);

// Cập nhật thông tin người dùng
router.put("/me", auth, userController.updateUserProfile);

// Đổi mật khẩu
router.put("/me/password", auth, userController.changePassword);

// Xóa tài khoản
router.delete("/me", auth, userController.deleteAccount);

// Lấy danh sách người dùng (chỉ dành cho admin)
router.get("/", auth, userController.getAllUsers);

// Lấy thông tin người dùng theo ID (chỉ dành cho admin)
router.get("/:id", auth, userController.getUserById);

// Cập nhật thông tin người dùng theo ID (chỉ dành cho admin)
router.put("/:id", auth, userController.updateUserById);

// Xóa người dùng theo ID (chỉ dành cho admin)
router.delete("/:id", auth, userController.deleteUserById);

module.exports = router;