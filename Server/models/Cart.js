import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product"
        },
        count: Number,
        totalPrice: Number
      }
    ],
    totalAfterDiscount: Number,
    cartTotal: Number,
    orderedBy: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);

// https://www.quora.com/What-do-I-truly-need-to-learn-and-do-to-become-a-successful-software-engineer
// https://www.quora.com/What-is-the-best-way-I-can-learn-JavaScript-and-how-much-time-does-it-take/answer/Peter-Shaw-13
