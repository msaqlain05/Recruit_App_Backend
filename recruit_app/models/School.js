import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    city: String,
    state: String,
    zip: String,
    website: String
}, { timestamps: true });

const School = model('School', schoolSchema);

export default School;
