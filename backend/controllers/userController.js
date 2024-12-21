const userService = require('../services/userService');

//Controller to Register user
exports.registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.registerUser(userData);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Controller to login user
exports.loginUser = async (req, res) => {
  try {
    const loginData = req.body;
    console.log("loginData"+loginData)
    const { token, user } = await userService.loginUser(loginData);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
