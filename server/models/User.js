import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true }, // Changed from username
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // 'bio' is fine, but the frontend doesn't use it yet.
  bio:      { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;


