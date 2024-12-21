// routes/userRoutes.js 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser); //User Registering API
router.post('/login', userController.loginUser); //User login API

module.exports = router;