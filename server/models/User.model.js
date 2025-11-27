import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'superadmin', 'counsellor'],
  },
  verifyOtp: {
    type: String,
    default: ""
  },
  expiryOtp: {
    type: Date,
    default: 0
  },

  isVerified: {
    type: Boolean,
    default: false
  },
  isProfileComplete:{
    type: Boolean,
    default: false
  }

}, { timestamps: true })


userSchema.methods.comparePassword = async function (userpasssword) {
  return bcrypt.compare(userpasssword, this.password);
};

export const User = mongoose.model('User', userSchema);