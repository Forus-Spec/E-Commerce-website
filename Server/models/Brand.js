import mongoose from 'mongoose';

// this is our brandSchema functionality which is amazing
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "brand is required"],
    unique: [true, "brand name has to be unique"],
    minlength: [2, "brand too short"],
    maxlength: [18, "brand too long"]
  },
  slug: {
    type: String,
    lowercase: true,
    index: true
  }
}, { timestamps: true })

export default mongoose.model('Brand', brandSchema)
