import Prospect from '../models/Prospect.js';
import UserDetails from '../models/UserDetails.js';
import { sendSuccess, sendError } from '../utils/response.js';

export async function getProspectDetails(_req, res) {
    try {
        const prospects = await Prospect.find()
            .populate('school_id', 'name address city state zip website')
            .populate('admin_id', 'firstName lastName email');

        const prospectIds = prospects.map(p => p._id);

        const userDetails = await UserDetails.find({ prospect_id: { $in: prospectIds } })
            .populate('admin_id', 'firstName lastName email')
            .populate('coach_id', 'firstName lastName email');

        const combined = prospects.map(prospect => {
            const details = userDetails.find(
                ud => String(ud.prospect_id) === String(prospect._id)
            );
            return {
                _id: prospect._id,
                firstName: prospect.firstName,
                lastName: prospect.lastName,
                height: prospect.height,
                rating: prospect.rating,
                school: prospect.school_id,
                userDetails: details || null
            };
        });

        return sendSuccess(res, combined, 'Prospect details fetched successfully');
    } catch (err) {
        return sendError(res, err);
    }
}

export default {
    getProspectDetails
};
