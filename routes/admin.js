const express = require("express");
const router = express.Router();
const checkCategory = require("../middlewares/checkCategory");
const {
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

//  Get all users
router.get("/users", verifyToken, isAdmin, getAllUsers);

//  Create product
router.post("/products", verifyToken, isAdmin, checkCategory, createProduct);

//  Update product
router.put("/products/:id", verifyToken, isAdmin, checkCategory, updateProduct);

// Delete product
router.delete("/products/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
