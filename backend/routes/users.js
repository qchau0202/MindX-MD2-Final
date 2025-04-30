const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// CRUD
router.get("/me", auth, userController.getUserProfile);
router.get("/search", auth, userController.searchUsers);
router.put("/me", auth, userController.updateUserProfile);
router.put("/me/password", auth, userController.changePassword);
router.delete("/me", auth, userController.deleteAccount);
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.put("/:id", auth, userController.updateUserById);
router.delete("/:id", auth, userController.deleteUserById);

module.exports = router;