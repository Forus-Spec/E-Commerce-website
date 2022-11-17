import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category is required"],
    unique: [true, "category already exists"],
    minlength: [2, "name is too short"],
    maxlength: [18, "name is too long"]
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  }
}, { timestamps: true })

export default mongoose.model('Category', categorySchema)
