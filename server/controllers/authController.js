import User from '../models/User.js';
// --- SWITCH BACK TO bcryptjs ---
import bcrypt from 'bcryptjs';
// -----------------------------
import jwt from 'jsonwebtoken';

// The rest of your registerUser and loginUser functions are
// already correct and do not need to be changed.
// The function names are identical between the two libraries.

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User with this email already exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    } else {
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};
