const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Public route to get all products
router.get("/", getProducts);

// Public route to get a product by ID
router.get("/:id", getProductById);

module.exports = router;
