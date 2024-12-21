const cartService = require('../services/cartService');

//Controller to Add product to Cart
exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const updatedCart = await cartService.addProductToCart(userId, productId);
    res.status(200).json({ message: 'Product added to cart', cart: updatedCart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Error adding product to cart' });
  }
};

//Controller to Remove product from Cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    console.log("userId ::-"+userId +"productId :: -"+productId)
    const updatedCart = await cartService.removeProductFromCart(userId, productId);
    res.status(200).json({ message: 'Product removed from cart', cart: updatedCart });
  } catch (error) {
    console.log("error msg "+error)
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: error.message});
  }
};

// Controller to get cart products
exports.getCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const products = await cartService.getCartProductDetails(userId);
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching cart products:', error);
    res.status(500).json({ message: error.message });
  }
};