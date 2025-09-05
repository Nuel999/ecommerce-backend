// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  payOrder,
} = require("../controllers/orderController");
const validate = require("../middlewares/validate");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

//  Place an order (user only)
router.post("/place", verifyToken, placeOrder);

// Get user's own orders
router.get("/my-orders", verifyToken, getMyOrders);

//  Admin: Get all orders
router.get("/all", verifyToken, isAdmin, getAllOrders);

// Admin: Update delivery status
router.put("/:id", verifyToken, isAdmin, updateOrderStatus);

// user: Pay for an order
router.post("/:id/pay", verifyToken, payOrder);

module.exports = router;
