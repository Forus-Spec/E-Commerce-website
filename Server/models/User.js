import mongoose from "mongoose";
import validator from "validator";
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Would you please provide your first Name"],
      minlength: [3, "minimum length should be"],
      maxlength: [20, "Maximum length should be"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "Would you please provide your last Name"],
      minlength: [3, "Minimum length should be 3"],
      maxlength: [24, "Maximum length should be 20"]
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email"
      },
      unique: true
    },
    phone: {
      type: Number,
      required: [true, "Please provide your phone number !"],
      unique: [true, "Phone number is already taken !"]
    },
    country: {
      type: String,
      required: [true, "Please provide your country location !"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "Please provide your city location !"],
      trim: true
    },
    bio: {
      type: String,
      minlength: [10, "minimum bio length should be 3"],
      maxlength: [160, "maximum bio length should be 4"]
    },
    image: {
      public_id: String,
      url: String
    },
    role: {
      type: String,
      required: true,
      default: "user"
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "password must be at least 6 characters"],
      select: false
    },
    resetPasswordLink: {
      data: String
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
    resetCode: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
