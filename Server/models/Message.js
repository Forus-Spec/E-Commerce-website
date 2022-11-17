import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
    minlength: [2, "name is too short"],
    maxlength: [18, "name is too long"]
  },
  slug: {
    type: String,
    lowercase: true,
    index: true
  },
  email: {
    type: String,
    required: [true, 'Your email is required'],
    lowercase: true,
    index: true
  },
  orderNo: {
    type: String,
  },
  inquiry: {
    type: String,
    enum: [
      'General Inquiry',
      'Return Policy',
      'My Order & Tracking',
      'Shipping & Handling',
      'others']
  },
  message: {
    type: String,
    required: [true, "Your email is required"],
    minlength: [20, "Too short"],
    maxlength: [950, "Too long"]
  }
}, { timestamps: true })

export default mongoose.model('Message', MessageSchema)
