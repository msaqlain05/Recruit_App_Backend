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
  console.log('Register request received'); 
  try {
    const requester = req.user;

    // ✅ 1. Only superadmin users can create users
    if (!requester || requester.role !== 'superadmin') {
      return sendError(res, new Error('Unauthorized: Only superadmin users can register users'), 403);
    }

    const { firstName, lastName, email, password, role, admin_id } = req.body;

    // ✅ 2. Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, new Error('Email already exists'), 400);
    }

    // ✅ 3. Set parent_id = logged-in superuser's ID
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      admin_id,
      parent_id: requester.id, // 🔥 Set parent_id from token
      
    });

    const token = generateToken(user);
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    return sendSuccess(res, { userResponse, token }, 'User registered successfully', 201);
  } catch (err) {
    return sendError(res, err);
  }
}




// @desc    Login user
// @route   POST /api/auth/login
export async function loginUser(req, res) {
  console.log('Login request received'); // ✅ Debugging log
  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, new Error('Email not found'), 401);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return sendError(res, new Error('Incorrect password'), 401);
    }

    const token = generateToken(user);
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    return sendSuccess(res, { userResponse, token }, 'Login successful', 200);
  } catch (err) {
    return sendError(res, err);
  }
}
