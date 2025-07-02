import User from '../models/User.js';
import jwt from 'jsonwebtoken'; // ✅ Fix
const { sign } = jwt;

import { sendSuccess, sendError } from '../utils/response.js';

// Generate JWT token
const generateToken = (user) => {
  return sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      admin_id: user.parent_id || null
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
export async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password, role, parent_id } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, new Error('Email already exists'), 400);
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      parent_id
    });

    const token = generateToken(user);
    return sendSuccess(res, { user, token }, 'User registered successfully', 201);
  } catch (err) {
    return sendError(res, err);
  }
}

// @desc    Login user
// @route   POST /api/auth/login
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return sendError(res, new Error('Invalid email or password'), 401);
    }

    const token = generateToken(user);
    return sendSuccess(res, { user, token }, 'Login successful', 200);
  } catch (err) {
    return sendError(res, err);
  }
}
