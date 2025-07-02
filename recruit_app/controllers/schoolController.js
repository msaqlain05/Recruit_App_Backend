import School from '../models/School.js';
import { sendSuccess, sendError } from '../utils/response.js';

// POST /api/schools
export async function createSchool(req, res) {
    try {
        const school = await School.create(req.body);
        return sendSuccess(res, school, 'School created successfully', 201);
    } catch (err) {
        return sendError(res, err, err.statusCode || 500);
    }
}
