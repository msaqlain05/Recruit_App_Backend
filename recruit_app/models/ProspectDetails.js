import { Schema, model } from 'mongoose';

const prospectDetailsSchema = new Schema({
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coach_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assigned_coach_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  prospect_id: {
    type: Schema.Types.ObjectId,
    ref: 'Prospect',
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  instagramLink: {
    type: String,
    default: null
  },
  twitterLink: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default model('ProspectDetails', prospectDetailsSchema);
