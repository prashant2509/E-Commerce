const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Handle: String,
  Title: String,
  Body: String,
  Vendor: String,
  Type: String,
  Tags: String,
  'Variant SKU': String,
  'Variant Price': Number,
  'Image Src': String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
