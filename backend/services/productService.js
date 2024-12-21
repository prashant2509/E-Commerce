// services/productService.js
const Product = require('../models/productModel');

//Function to get Products List
exports.getProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

//Function to search product by Title/Variant SKU
exports.searchProducts = async (query) => {
  try {
    console.log("query in services"+query)
    return await Product.find({
      $or: [
        { 'Variant SKU': new RegExp(query, 'i') },  // Search by Variant SKU
        { Title: new RegExp(query, 'i') }  // Search by name
      ]
    });
  } catch (error) {
    throw new Error('Error searching products');
  }
};


//Function to get product by product ID
exports.getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw new Error('Error fetching product details');
  }
};

  
