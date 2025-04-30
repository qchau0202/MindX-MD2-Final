const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

// CRUD
router.post("/", auth, orderController.createOrder);
router.get("/", auth, orderController.getOrders);
router.get("/details", auth, orderController.getOrdersWithDetails);
router.patch("/:orderId/cancel", auth, orderController.cancelOrder);
router.delete("/:orderId", auth, orderController.deleteOrder);
router.patch("/:orderId/accept", auth, orderController.acceptOrder);
router.patch("/:orderId/reject", auth, orderController.rejectOrder);

module.exports = router;
