const Order = require("../models/Order");
const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");

// Helper function to calculate total price based on rental duration, including tax
const calculateTotalPrice = (startDate, endDate, dailyPrice) => {
  if (!dailyPrice || dailyPrice <= 0) {
    throw new Error("Invalid vehicle price");
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInMs = end - start;
  const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
  if (durationInDays <= 0) {
    throw new Error("Invalid rental dates: End date must be after start date");
  }
  const subTotal = durationInDays * dailyPrice;
  const tax = subTotal * 0.1; // Thuế 10%
  const totalPrice = subTotal + tax;
  return totalPrice;
};

// Create an order
const createOrder = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can place orders",
      });
    }

    const {
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      pickUpLocation,
      dropOffLocation,
      pickUpTime,
      dropOffTime,
    } = req.body;

    if (
      !vehicleId ||
      !startDate ||
      !endDate ||
      totalPrice == null ||
      !pickUpLocation ||
      !dropOffLocation ||
      !pickUpTime ||
      !dropOffTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }
    if (start < now) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be in the past",
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle || vehicle.status !== "available" || !vehicle.isApproved) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not available or not approved",
      });
    }

    // Check for vehicle availability
    const conflictingOrders = await Order.find({
      vehicleId,
      status: { $in: ["pending", "confirmed"] },
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });
    if (conflictingOrders.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is already booked for the selected dates",
      });
    }
    const calculatedTotalPrice = calculateTotalPrice(
      startDate,
      endDate,
      vehicle.pricePerDay
    );
    if (Math.abs(totalPrice - calculatedTotalPrice) > 0.01) {
      return res.status(400).json({
        success: false,
        message: `Total price does not match calculated price. Expected: ${calculatedTotalPrice}, Received: ${totalPrice}`,
      });
    }

    const order = new Order({
      customerId: req.user.userId,
      providerId: vehicle.providerId,
      vehicleId,
      startDate,
      endDate,
      totalPrice,
      pickUpLocation,
      dropOffLocation,
      pickUpTime,
      dropOffTime,
      status: "pending",
    });
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(error.message.includes("Invalid") ? 400 : 500).json({
      success: false,
      message: error.message || "Server error while creating order",
    });
  }
};

// Accept an order
const acceptOrder = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can accept orders",
      });
    }

    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be accepted",
      });
    }

    order.status = "confirmed";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order accepted successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error accepting order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while accepting order",
    });
  }
};

// Reject an order
const rejectOrder = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admins can reject orders",
      });
    }

    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be rejected",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order rejected successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error rejecting order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while rejecting order",
    });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can cancel orders",
      });
    }

    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.customerId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only cancel your own orders",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be cancelled",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      success: false,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while cancelling order",
    });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can delete orders",
      });
    }

    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.customerId.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own orders",
      });
    }

    if (order.status !== "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Only cancelled orders can be deleted",
      });
    }

    await Order.deleteOne({ _id: orderId });

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting order",
    });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "customer") {
      query.customerId = req.user.userId;
    } else if (req.user.role === "car_provider") {
      query.providerId = req.user.userId;
    } else if (req.user.role === "admin") {
      // Admin can see all orders
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const orders = await Order.find(query)
      .populate("customerId", "name email")
      .populate("providerId", "name email")
      .populate(
        "vehicleId",
        "make model type fuel transmission capacity pricePerDay"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while fetching orders",
    });
  }
};

// Get orders with details
const getOrdersWithDetails = async (req, res) => {
  try {
    let matchQuery = {};
    if (req.user.role === "customer") {
      matchQuery.customerId = new mongoose.Types.ObjectId(req.user.userId);
    } else if (req.user.role === "car_provider") {
      matchQuery.providerId = new mongoose.Types.ObjectId(req.user.userId);
    } else if (req.user.role === "admin") {
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const orders = await Order.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: "users",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "providerId",
          foreignField: "_id",
          as: "provider",
        },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicleId",
          foreignField: "_id",
          as: "vehicle",
        },
      },
      {
        $unwind: { path: "$customer", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$provider", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$vehicle", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          customer: { name: 1, email: 1, _id: 1 },
          provider: { name: 1, email: 1, _id: 1 },
          vehicle: {
            make: 1,
            model: 1,
            type: 1,
            fuel: 1,
            transmission: 1,
            capacity: 1,
            pricePerDay: 1,
            _id: 1,
          },
          pickUpLocation: 1,
          dropOffLocation: 1,
          startDate: 1,
          endDate: 1,
          pickUpTime: 1,
          dropOffTime: 1,
          totalPrice: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return res.status(200).json({
      success: true,
      message: "Orders with details retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders with details:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message || "Server error while fetching orders with details",
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrdersWithDetails,
  cancelOrder,
  deleteOrder,
  acceptOrder,
  rejectOrder,
};