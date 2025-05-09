const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// API trả về dữ liệu thống kê cho dashboard
router.get("/stats", dashboardController.getDashboardStats);

// Route trang dashboard
router.get("/", dashboardController.dashboardPage);

module.exports = router;
