const Cart = require("../models/Cart");
const AppError = require("../utils/AppError");

const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // get user ID from authenticated user

  try {
    if (!productId || !quantity) {
      return next(new AppError("Product ID and quantity are required", 400));
    } // check is product ID and quantity are provided

    let cart = await Cart.findOne({ user: userId }); // find cart by user ID

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    } // if no cart exists, create a new one

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    ); // check if product already in cart

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    } // if product exists, update quantity; else add new item

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    next(new AppError("Failed to add to cart", 500));
  }
};

const viewCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price imageUrl"
    );// find cart by user ID and populate product details 

    if (!cart) {
      return res.status(200).json({ items: [] }); // if no cart, return empty items array
    }

    res.status(200).json(cart);
  } catch (err) {
    next(new AppError("Failed to cart", 500));
  }
};

// Remove item from cart
const removeFromCart = async (req, res, next) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user._id }); // find cart by user ID

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    ); //remove items with matching product ID

    await cart.save();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    next(new AppError("Failed to remove item from cart", 500));
  }
};

module.exports = { addToCart, viewCart, removeFromCart};
