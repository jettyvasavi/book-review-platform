import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  // --- ADD 'index: true' TO THE EMAIL FIELD ---
  email:    { 
    type: String, 
    required: true, 
    unique: true,
    index: true // This tells MongoDB to optimize searches on this field
  },
  // ------------------------------------------
  password: { type: String, required: true },
  bio:      { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;


