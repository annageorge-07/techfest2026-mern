import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  role: { type: String, required: true, enum: ['student', 'faculty', 'professional', 'other'] }
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);
