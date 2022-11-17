import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [2, "product name too short"],
      maxlength: [18, "product name too long"],
      text: true,
      index: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [8, "product description too short"],
      maxlength: [460, "product description too long"],
      text: true,
      index: true
    },
    price: {
      type: Number,
      required: [true, "Product should have a price"]
    },
    stock: {
      type: Number,
      required: [true, "Stock number should be specified"],
      trim: true
    },
    category: {
      type: ObjectId,
      required: [true, "Product should belong to a category"],
      ref: "Category"
      // text: true
    },
    brand: {
      type: ObjectId,
      ref: "Brand"
    },
    images: [
      {
        required: [true, "At least single image is required"],
        type: String
      }
    ],
    Promotion: {
      type: Number
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: ObjectId,
          ref: "User"
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
