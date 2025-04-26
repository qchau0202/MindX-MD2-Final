// const Vehicle = require("../models/Vehicle");

// // Tìm kiếm xe
// const searchVehicles = async (req, res) => {
//   try {
//     const { location, startDate, endDate } = req.query;
//     const query = { isApproved: true, status: "available" };
//     if (location) query.location = location;
//     const vehicles = await Vehicle.find(query).populate(
//       "providerId",
//       "name email"
//     );
//     res.json(vehicles);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Đăng tin xe
// const createVehicle = async (req, res) => {
//   try {
//     if (req.user.role !== "car_provider") {
//       return res
//         .status(403)
//         .json({ error: "Only car providers can post vehicles" });
//     }
//     const { make, model, year, pricePerDay, images, description, location } =
//       req.body;
//     const vehicle = new Vehicle({
//       providerId: req.user.userId,
//       make,
//       model,
//       year,
//       pricePerDay,
//       images,
//       description,
//       location,
//       status: "pending",
//       isApproved: false,
//     });
//     await vehicle.save();
//     res.status(201).json(vehicle);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Xem danh sách xe của nhà cung cấp
// const getProviderVehicles = async (req, res) => {
//   try {
//     if (req.user.role !== "car_provider") {
//       return res
//         .status(403)
//         .json({ error: "Only car providers can view their vehicles" });
//     }
//     const vehicles = await Vehicle.find({ providerId: req.user.userId });
//     res.json(vehicles);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Cập nhật xe
// const updateVehicle = async (req, res) => {
//   try {
//     if (req.user.role !== "car_provider") {
//       return res
//         .status(403)
//         .json({ error: "Only car providers can update vehicles" });
//     }
//     const vehicle = await Vehicle.findById(req.params.id);
//     if (!vehicle || vehicle.providerId.toString() !== req.user.userId) {
//       return res
//         .status(404)
//         .json({ error: "Vehicle not found or unauthorized" });
//     }
//     const { make, model, year, pricePerDay, images, description, location } =
//       req.body;
//     Object.assign(vehicle, {
//       make,
//       model,
//       year,
//       pricePerDay,
//       images,
//       description,
//       location,
//     });
//     await vehicle.save();
//     res.json(vehicle);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Xóa xe
// const deleteVehicle = async (req, res) => {
//   try {
//     if (req.user.role !== "car_provider") {
//       return res
//         .status(403)
//         .json({ error: "Only car providers can delete vehicles" });
//     }
//     const vehicle = await Vehicle.findById(req.params.id);
//     if (!vehicle || vehicle.providerId.toString() !== req.user.userId) {
//       return res
//         .status(404)
//         .json({ error: "Vehicle not found or unauthorized" });
//     }
//     await vehicle.deleteOne();
//     res.json({ message: "Vehicle deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   searchVehicles,
//   createVehicle,
//   getProviderVehicles,
//   updateVehicle,
//   deleteVehicle,
// };


const Vehicle = require("../models/Vehicle");
const Order = require("../models/Order");

// Tìm kiếm xe
const searchVehicles = async (req, res) => {
  try {
    const { location, startDate, endDate, type } = req.query;
    const query = { isApproved: true, status: "available" };
    if (location) query.location = location;
    if (type) query.type = type;

    const vehicles = await Vehicle.find(query).populate(
      "providerId",
      "name email"
    );

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ error: "Invalid date format" });
      }

      // Lọc xe có lịch trình không xung đột
      const availableVehicles = [];
      for (const vehicle of vehicles) {
        const conflictingOrders = await Order.find({
          vehicleId: vehicle._id,
          status: { $in: ["pending", "confirmed"] },
          $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
        });
        if (conflictingOrders.length === 0) {
          availableVehicles.push(vehicle);
        }
      }
      return res.json(availableVehicles);
    }

    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Đăng tin xe
const createVehicle = async (req, res) => {
  try {
    if (req.user.role !== "car_provider") {
      return res
        .status(403)
        .json({ error: "Only car providers can post vehicles" });
    }
    const {
      make,
      model,
      year,
      pricePerDay,
      images,
      description,
      location,
      type,
      fuel,
      transmission,
      capacity,
    } = req.body;

    // Validate enum fields
    const validTypes = [
      "Sport",
      "SUV",
      "Coupe",
      "Hatchback",
      "Sedan",
      "MPV",
      "EV",
    ];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid vehicle type" });
    }
    const validTransmissions = ["Manual", "Automatic", "Electric"];
    if (transmission && !validTransmissions.includes(transmission)) {
      return res.status(400).json({ error: "Invalid transmission type" });
    }

    const vehicle = new Vehicle({
      providerId: req.user.userId,
      make,
      model,
      year,
      pricePerDay,
      images,
      description,
      location,
      type,
      fuel,
      transmission,
      capacity,
      status: "pending",
      isApproved: false,
    });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xem danh sách xe của nhà cung cấp
const getProviderVehicles = async (req, res) => {
  try {
    if (req.user.role !== "car_provider") {
      return res
        .status(403)
        .json({ error: "Only car providers can view their vehicles" });
    }
    const vehicles = await Vehicle.find({ providerId: req.user.userId });
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật xe
const updateVehicle = async (req, res) => {
  try {
    if (req.user.role !== "car_provider") {
      return res
        .status(403)
        .json({ error: "Only car providers can update vehicles" });
    }
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle || vehicle.providerId.toString() !== req.user.userId) {
      return res
        .status(404)
        .json({ error: "Vehicle not found or unauthorized" });
    }
    const {
      make,
      model,
      year,
      pricePerDay,
      images,
      description,
      location,
      type,
      fuel,
      transmission,
      capacity,
    } = req.body;

    // Validate enum fields
    const validTypes = [
      "Sport",
      "SUV",
      "Coupe",
      "Hatchback",
      "Sedan",
      "MPV",
      "EV",
    ];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid vehicle type" });
    }
    const validTransmissions = ["Manual", "Automatic", "Electric"];
    if (transmission && !validTransmissions.includes(transmission)) {
      return res.status(400).json({ error: "Invalid transmission type" });
    }

    Object.assign(vehicle, {
      make,
      model,
      year,
      pricePerDay,
      images,
      description,
      location,
      type,
      fuel,
      transmission,
      capacity,
    });
    await vehicle.save();
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa xe
const deleteVehicle = async (req, res) => {
  try {
    if (req.user.role !== "car_provider") {
      return res
        .status(403)
        .json({ error: "Only car providers can delete vehicles" });
    }
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle || vehicle.providerId.toString() !== req.user.userId) {
      return res
        .status(404)
        .json({ error: "Vehicle not found or unauthorized" });
    }
    await vehicle.deleteOne();
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  searchVehicles,
  createVehicle,
  getProviderVehicles,
  updateVehicle,
  deleteVehicle,
};