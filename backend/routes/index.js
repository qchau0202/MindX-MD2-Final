const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const vehicleRoutes = require("./vehicles");
const orderRoutes = require("./orders");
const userRoutes = require("./users");
// Định nghĩa các route con
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/vehicles", vehicleRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
