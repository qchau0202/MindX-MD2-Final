const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

// Đặt xe
router.post("/", auth, orderController.createOrder);

// Xem danh sách đơn hàng
router.get("/", auth, orderController.getOrders);

module.exports = router;
