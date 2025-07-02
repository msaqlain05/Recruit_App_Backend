import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, new Error('Unauthorized: No token provided'), 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      admin_id: decoded.admin_id || null
    };

    next(); // Proceed to route
  } catch (err) {
    return sendError(res, new Error('Unauthorized: Invalid or expired token'), 403);
  }
};
