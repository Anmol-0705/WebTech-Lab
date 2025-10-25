// backend/controllers/userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register: create user (password hashed)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hash });
    // Return created user (without password)
    const { password: _, ...userSafe } = user.toObject();
    res.status(201).json({ user: userSafe, message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login: verify credentials and return user (no JWT)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    // Return user object without password
    const { password: _, ...userSafe } = user.toObject();
    res.json({ user: userSafe });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
