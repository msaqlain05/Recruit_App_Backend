import mongoose from 'mongoose';
import Prospect from '../models/Prospect.js';
import ProspectDetails from '../models/ProspectDetails.js';
import { sendSuccess, sendError } from '../utils/response.js';



// POST /api/prospect-details
export async function createProspectDetails(req, res) {
    try {
        const prospectDetails = await ProspectDetails.create(req.body);
        return sendSuccess(res, prospectDetails, 'Prospect details created successfully', 201);
    } catch (err) {
        return sendError(res, err);
    }
}







export async function getProspectDetails(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return sendError(res, new Error('Prospect ID is required in query parameters'), 400);
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, new Error('Invalid Prospect ID format'), 400);
    }

    // Step 1: Fetch the main prospect info
    const prospect = await Prospect.findById(id)
      .populate('school_id', 'name address city state zip website')
      .populate('admin_id', 'firstName lastName email')
      .lean();

    if (!prospect) {
      return sendError(res, new Error('Prospect not found'), 404);
    }

    // Step 2: Fetch prospectDetails
    const prospectDetails = await ProspectDetails.findOne({ prospect_id: id })
      .populate('admin_id', 'firstName lastName email')
      .populate('coach_id', 'firstName lastName email')
      .populate('assigned_coach_id', 'firstName lastName email')
      .lean();

    // Step 3: Role-based access control
    let authorizedDetails = null;

    if (prospectDetails) {
      const { role, id: userId } = req.user;

      const isAdminMatch =
        role === 'admin' && prospectDetails.admin_id?._id?.toString() === userId;

      const isCoachMatch =
        role === 'coach' && prospectDetails.coach_id?._id?.toString() === userId;

      if (isAdminMatch || isCoachMatch) {
        authorizedDetails = prospectDetails;
      }
    }

    // Step 4: Build and send response
    const combined = {
      ...prospect,
      prospectDetails: authorizedDetails,
    };

    return sendSuccess(res, combined, 'Prospect detail fetched successfully');
  } catch (err) {
    console.error('Error fetching prospect details:', err);
    return sendError(res, new Error('Internal server error'), 500);
  }
}