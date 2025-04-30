const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const auth = require("../middleware/auth");

// CRUD
router.get("/", vehicleController.searchVehicles);
router.post("/", auth, vehicleController.createVehicle);
router.get("/provider", auth, vehicleController.getProviderVehicles);
router.put("/:id", auth, vehicleController.updateVehicle);
router.delete("/:id", auth, vehicleController.deleteVehicle);

module.exports = router;
