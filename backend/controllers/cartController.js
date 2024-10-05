// server/controllers/cartController.js

const Cart = require("../models/Cart");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price } = req.body; // Ensure these are passed in the request body
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.items.find(item => item.productId == productId);

    if (existingProduct) {
      // If the product exists, increment the quantity
      existingProduct.quantity += 1;
    } else {
      // If the product doesn't exist, add a new item to the cart
      cart.items.push({ productId, name, price, quantity: 1 });
    }

    // Update the total amount
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Save the cart
    await cart.save();

    res.json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

// Get cart items for a user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

// Update product quantity in cart
exports.updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.items.findIndex(item => item.productId == productId);
      if (productIndex >= 0) {
        cart.items[productIndex].quantity = quantity;
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err.message });
  }
};

// Remove product from cart
exports.removeCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.items.findIndex(item => item.productId == productId);

      if (productIndex >= 0) {
        const productPrice = cart.items[productIndex].price;
        const quantity = cart.items[productIndex].quantity;

        cart.items.splice(productIndex, 1);
        cart.totalAmount -= productPrice * quantity;
        await cart.save();
        res.json(cart);
      } else {
        res.status(404).json({ message: "Product not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting product from cart", error: err.message });
  }

};
