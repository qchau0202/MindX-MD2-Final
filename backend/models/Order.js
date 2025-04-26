// /* models/Order.js */
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   customerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   providerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   vehicleId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Vehicle",
//     required: true,
//   },
//   startDate: {
//     type: Date,
//     required: true,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "completed", "cancelled"],
//     default: "pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Cập nhật updatedAt trước khi lưu
// orderSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// // Định nghĩa index
// orderSchema.index({ customerId: 1 });
// orderSchema.index({ providerId: 1 });
// orderSchema.index({ vehicleId: 1 });
// orderSchema.index({ status: 1 });

// module.exports = mongoose.model("Order", orderSchema, "orders");

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  pickUpLocation: {
    type: String,
    required: true,
    trim: true,
  },
  dropOffLocation: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  pickUpTime: {
    type: String,
    required: true,
    trim: true,
  },
  dropOffTime: {
    type: String,
    required: true,
    trim: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Cập nhật updatedAt trước khi lưu
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Định nghĩa index
orderSchema.index({ customerId: 1 });
orderSchema.index({ providerId: 1 });
orderSchema.index({ vehicleId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model("Order", orderSchema, "orders");