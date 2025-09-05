const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

const placeOrder = async (req, res, next) => {
  const { items, deliveryAddress, paymentMethod } = req.body;
  const userId = req.user._id;
  console.log("[DEBUG] User in request:", req.user);

  try {
    if (!items || items.length === 0) {
      return next(new AppError("No items in order", 400));
    }

    // Validate products and calculate total
    let totalAmount = 0;
    for (const item of items) {
      console.log("[DEBUG] Checking product:", item.product);
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return next(new AppError("Invalid product ID", 400));
      } // validate product ID format
      const product = await Product.findById(item.product);
      console.log("[DEBUG] Fetched product:", product);
      if (!product) {
        return next(new AppError(`Product not found: ${item.product}`, 404));
      }
      totalAmount += product.price * item.quantity; //calculate total
    }

    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || "card",
    }); // default to card if not provided
    console.log("[DEBUG] New Order Data:", newOrder);

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (err) {
    console.error("[ERROR] placeOrder failed:", err);
    next(new AppError(err.message || "Unable to place order", 500));
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );

    if (!orders || orders.length === 0) {
      return next(new AppError("No orders found", 404));
    }

    res.status(200).json(orders);
  } catch (err) {
    next(new AppError("Failed to fetch orders", 500));
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");

    res.status(200).json(orders);
  } catch (err) {
    next(new AppError("Failed to fetch all orders", 500));
  }
};

const updateOrderStatus = async (req, res, next) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    order.deliveryStatus = status;
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    next(new AppError("Failed to update order", 500));
  }
};

const payOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    order.paymentStatus = "paid";
    order.paidAt = Date.now();
    order.paymentMethod = req.body.paymentMethod || "card"; // default to card if not provided

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    next(new AppError("Failed to update payment status", 500));
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  payOrder,
};
