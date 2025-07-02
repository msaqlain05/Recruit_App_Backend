import { Schema, model } from 'mongoose';

const prospectSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  height: {
    type: Number // e.g., in cm or inches
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  school_id: {
    type: Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
}, { timestamps: true });

export default model('Prospect', prospectSchema);
