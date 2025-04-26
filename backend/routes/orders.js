const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

// Xác nhận đơn hàng
// router.post("/confirm", auth, orderController.confirmOrder);

// Tạo đơn hàng
router.post("/", auth, orderController.createOrder);

// Xem danh sách đơn hàng
router.get("/", auth, orderController.getOrders);

// Xem danh sách đơn hàng với chi tiết đầy đủ
router.get("/details", auth, orderController.getOrdersWithDetails);

module.exports = router;
