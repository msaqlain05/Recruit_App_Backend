import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/response.js';

export async function getAllUsers(req, res) {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // Ensure page and limit are positive
    page = page < 1 ? 1 : page;
    limit = limit < 1 ? 10 : limit;

    const skip = (page - 1) * limit;

    // Exclude superadmin users
    const query = { role: { $ne: 'superadmin' } };

    const totalUsers = await User.countDocuments(query);
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .select('-password') // Exclude password
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalUsers / limit);

    return sendSuccess(
      res,
      {
        users,
        pagination: {
          totalUsers,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      },
      'Users fetched successfully'
    );
  } catch (err) {
    console.error('Error fetching users:', err);
    return sendError(res, new Error('Failed to fetch users'), 500);
  }
}
