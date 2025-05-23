const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["available", "rented", "pending", "inactive"],
    default: "pending",
  },
  type: {
    type: String,
    enum: ["Sport", "SUV", "Coupe", "Hatchback", "Sedan", "MPV", "EV"],
    required: true,
  },
  fuel: {
    type: String,
    trim: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic", "Electric"],
    trim: true,
  },
  capacity: {
    type: Number,
    min: 1,
  },
  location: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

// Cập nhật updatedAt trước khi lưu
vehicleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Định nghĩa index
vehicleSchema.index({ providerId: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ isApproved: 1 });
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ location: 1 });

module.exports = mongoose.model("Vehicle", vehicleSchema, "vehicles");