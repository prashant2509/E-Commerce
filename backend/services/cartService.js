// services/cartService.js
const User = require('../models/userModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose'); 

//Function to Add product to Cart
exports.addProductToCart = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    user.cart.push(product);
    await user.save();
    return user.cart;
  } catch (error) {
    throw new Error('Error adding product to cart');
  }
};

//Function to Remove product to Cart
exports.removeProductFromCart = async (userId, productId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.cart || user.cart.length === 0) {
      throw new Error('No items in cart');
    }
    const productIndex = user.cart.findIndex(item => item._id.toString() === productId);
    if (productIndex === -1) {
      throw new Error('Product not found in cart');
    }
    user.cart.splice(productIndex, 1); 
    user.cart = user.cart;  

    await user.save({ validateBeforeSave: false }); 

    return user.cart;
  } catch (error) {
    console.error('Error removing product from cart:', error.message);
    throw new Error('Error removing product from cart: ' + error.message);
  }
};

//Function to get products in Cart by passing User ID
exports.getCartProductDetails = async (userId) => {
  try {
    console.log("userid " + userId);
    const user = await User.findById(userId).select('cart');
    if (!user) {
      throw new Error('User not found');
    }

    const cartItems = user.cart;
    console.log("cartItems backend:", cartItems);
    const productIds = cartItems.map(item => new mongoose.Types.ObjectId(item._id)); 
    console.log("productIds:", productIds);

    if (!productIds.length) {
      return [];
    }
    const products = await Product.find({ _id: { $in: productIds } });
    console.log("products:", products);
    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product._id.toString(), product);
    });
    const detailedCart = cartItems.map(item => {
      const productDetail = productMap.get(item._id.toString());
      if (productDetail) {
        return {
          ...productDetail.toObject(),
        };
      }
    }).filter(product => product !== undefined);

    return detailedCart; 
  } catch (error) {
    console.error('Error fetching cart product details:', error);
    throw new Error('Error fetching cart product details: ' + error.message);
  }
};

