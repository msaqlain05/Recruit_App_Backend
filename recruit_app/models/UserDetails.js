import { Schema, model } from 'mongoose';

const userDetailsSchema = new Schema({
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

export default model('UserDetails', userDetailsSchema);
