// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET_KEY = 'your-secret-key';

// Register Controller
const registerUser = async (req, res) => {
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password || !phone) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.createUser(full_name, email, hashedPassword, phone, (err) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    res.json({ success: true, message: 'User registered successfully' });
  });
};

// Login Controller
const loginUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ success: true, message: 'Login successful', token });
  });
};

module.exports = {
  registerUser,
  loginUser
};
