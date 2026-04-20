const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/adminControllers/admin.controller");

router.post("/create", adminController.createAdmin);
router.post("/login", adminController.login);

module.exports = router;