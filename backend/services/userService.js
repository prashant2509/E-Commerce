const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Function for Registering user
const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = new User({ name, email, password });
  await user.save();

  const userWithoutPassword = { ...user._doc };
  delete userWithoutPassword.password;

  return userWithoutPassword;
};

//Function to Login as user
const loginUser = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const userWithoutPassword = { ...user._doc };
  delete userWithoutPassword.password;

  return { token, user: userWithoutPassword };
};

module.exports = {
  registerUser,
  loginUser,
};
