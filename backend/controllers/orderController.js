const Order = require("../models/Order");
const Vehicle = require("../models/Vehicle");

// Đặt xe
const createOrder = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({ error: "Only customers can place orders" });
    }
    const { vehicleId, startDate, endDate } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || vehicle.status !== "available" || !vehicle.isApproved) {
      return res
        .status(400)
        .json({ error: "Vehicle not available or not approved" });
    }
    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (days <= 0) {
      return res.status(400).json({ error: "Invalid rental dates" });
    }
    const totalPrice = days * vehicle.pricePerDay;
    const order = new Order({
      customerId: req.user.userId,
      providerId: vehicle.providerId,
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      status: "pending",
    });
    await order.save();
    vehicle.status = "rented";
    await vehicle.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xem danh sách đơn hàng
const getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "customer") {
      query.customerId = req.user.userId;
    } else if (req.user.role === "car_provider") {
      query.providerId = req.user.userId;
    } else {
      return res.status(403).json({ error: "Unauthorized access" });
    }
    const orders = await Order.find(query)
      .populate("customerId", "name email")
      .populate("providerId", "name email")
      .populate("vehicleId", "make model");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders };
