import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required']
  },
  lastName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'coach'],
    default: 'admin'
  },
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = model('User', userSchema);
export default User;
