import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" ,required:true},
  name: { type: String, required: true },
  storage: { type: String },
  colorName: { type: String },
  quantity: { type: Number, required: true },
  priceAfterDiscount: { type: Number, required: true },
  productImage: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: { type: [orderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, required: true, default: "aed" },
  paymentStatus: { type: String, required: true, default: "Pending" }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
