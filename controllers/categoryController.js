const Category = require("../models/Category");
const AppError = require("../utils/AppError");

// Create category
const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    next(new AppError("Failed to create category", 500));
  }
};

// Get all categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(new AppError("Failed to fetch categories", 500));
  }
};

// Update category
const updateCategory = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return next(new AppError("Category not found", 404));
    res.json(updated);
  } catch (err) {
    next(new AppError("Failed to update category", 500));
  }
};

// Delete category
const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new AppError("Category not found", 404));
    res.json({ message: "Category deleted" });
  } catch (err) {
    next(new AppError("Failed to delete category", 500));
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
