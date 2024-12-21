const productService = require('../services/productService');

//Controller to get list of products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

//Controller to search products by SKU / Title
exports.searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await productService.searchProducts(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
};

//Controller to get product by product ID
exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: error.message });
  }
};
