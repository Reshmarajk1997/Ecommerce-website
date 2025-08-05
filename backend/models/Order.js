import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  storage: String,
  colorName: String,
  quantity: Number,
  priceAfterDiscount: Number,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [orderItemSchema],
  totalAmount: Number,
  currency: String,
  paymentStatus: String,
  createdAt: Date,
});

export default mongoose.model("Order", orderSchema);
