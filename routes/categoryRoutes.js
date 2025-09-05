const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate"); // our generic Joi validator
const { categorySchema } = require("../validations/category");

// Admin: create category
router.post("/", verifyToken, isAdmin, validate(categorySchema), createCategory);

// Public: get all categories
router.get("/", getCategories);

// Admin: update category
router.put("/:id", verifyToken, isAdmin, validate(categorySchema), updateCategory);

// Admin: delete category
router.delete("/delete/:id", verifyToken, isAdmin, deleteCategory);

module.exports = router;
