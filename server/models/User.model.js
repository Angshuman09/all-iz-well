import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['student','admin', 'superadmin', 'counsellor'],
    },

},{timestamps: true})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(`error in hashing the password: ${error}`);
  }

});

userSchema.methods.comparePassword =async function(userpasssword) {
  return bcrypt.compare(userpasssword, this.password);
};

export const User = mongoose.model('User', userSchema);