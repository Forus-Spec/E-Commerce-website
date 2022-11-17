import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

// this is our cartSchema functionality which is amazing and awesome and beautifully well made and it's awesome
const orderSchema = new mongoose.Schema(
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
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not processed",
      enum: ["Idle", "Pending", "Rejected", "Resolved"]
    },
    orderedBy: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

// https://www.quora.com/What-do-I-truly-need-to-learn-and-do-to-become-a-successful-software-engineer
// https://www.quora.com/What-is-the-best-way-I-can-learn-JavaScript-and-how-much-time-does-it-take/answer/Peter-Shaw-13
