import Prospect from '../models/Prospect.js';
import { sendSuccess, sendError } from '../utils/response.js';

// POST /api/prospects
export const createProspect = async (req, res) => {
    try {
        const { firstName, lastName, height, rating, admin_id, school_id } = req.body;

        const prospect = await Prospect.create({
            firstName,
            lastName,
            height,
            rating,
            admin_id,
            school_id
        });

        return sendSuccess(res, prospect, 'Prospect created successfully', 201);
    } catch (err) {
        return sendError(res, err);
    }
};
