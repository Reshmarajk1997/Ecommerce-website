import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:"Product",required:true},
    productName: { type: String, required: true },         
  productImage: { type: String, required: true },    
    colorName: { type: String, required: true },
  storage: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAfterDiscount: { type: Number, required: true },  
})

const cartSchema  = new mongoose.Schema(
    {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
)


export default mongoose.model("Cart", cartSchema);