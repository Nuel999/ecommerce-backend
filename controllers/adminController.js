const User = require("../models/User");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const { productSchema } = require("../validations/product");


// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    next(new AppError("Failed to fetch users", 500));
  }
};

// Create a new product
// Create a new product
const createProduct = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(new AppError("Validation failed", 400, error.details));
    }

    // Create product
    const product = new Product({
      ...value,
      user: req.user.id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    next(new AppError("Failed to create product", 500));
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return next(new AppError("Validation failed", 400, error.details));
    }

    // Find product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Update with validated fields
    Object.assign(product, value); // only update fields that passed validation

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    next(new AppError("Failed to update product", 500));
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    next(new AppError("Failed to delete product", 500));
  }
};

module.exports = {
  getAllUsers,
  createProduct,
  updateProduct,
  deleteProduct,
};
