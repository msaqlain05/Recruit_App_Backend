import UserDetails from '../models/UserDetails.js';
import { sendSuccess, sendError } from '../utils/response.js';

// POST /api/user-details
export async function createUserDetails(req, res) {
    try {
        const userDetails = await UserDetails.create(req.body);
        return sendSuccess(res, userDetails, 'User details created successfully', 201);
    } catch (err) {
        return sendError(res, err);
    }
}
