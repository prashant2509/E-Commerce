// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authenticateToken');

router.post('/add-to-cart',authMiddleware, cartController.addToCart); //Add to cart API
router.post('/remove-from-cart',authMiddleware, cartController.removeFromCart); //Remove from cart API
router.get('/:userId',authMiddleware, cartController.getCartProducts); //get cart product by passsing user ID API 

module.exports = router;
