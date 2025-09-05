const Category = require("../models/Category");

const checkCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    } 

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    next();
  } catch (err) {
    console.error("[Category Check Error]", err);
    res.status(500).json({
      success: false,
      message: "Error verifying category",
    });
  }
};

module.exports = checkCategory;
