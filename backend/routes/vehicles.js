const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const auth = require("../middleware/auth");

// Tìm kiếm xe
router.get("/", vehicleController.searchVehicles);

// Đăng tin xe
router.post("/", auth, vehicleController.createVehicle);

// Xem danh sách xe của nhà cung cấp
router.get("/provider", auth, vehicleController.getProviderVehicles);

// Cập nhật xe
router.put("/:id", auth, vehicleController.updateVehicle);

// Xóa xe
router.delete("/:id", auth, vehicleController.deleteVehicle);

module.exports = router;
