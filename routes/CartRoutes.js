const express = require("express");
const {
  addToCart,
  viewCart,
  removeFromCart,
} = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { cartSchema } = require("../validations/cart");
const validate = require("../middlewares/validate");
const router = express.Router();

const extractProductIds = (req, res, next) => {
  const items = req.body.items || [];
  req.body.productIds = items.map((item) => item.productId); // Extractproduct IDs
  next();
}; // Middleware to extract products IDs from request body

router.post("/add", verifyToken, addToCart);

router.get("/view", verifyToken, viewCart);

router.delete("/remove/:productId", verifyToken, removeFromCart);

module.exports = router;
