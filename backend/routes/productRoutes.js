// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authenticateToken');

router.get('/products',authMiddleware,productController.getAllProducts); //list product API
router.get('/search',authMiddleware, productController.searchProducts); //search product API
router.get('/:productId',authMiddleware, productController.getProductById); //get product by product ID API

module.exports = router;
