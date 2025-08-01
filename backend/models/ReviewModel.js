import mongoose from "mongoose";
 
const ReviewSchema = new mongoose.Schema({
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"User",required:true },
    name: { type:String, required:true },
    rating:{ type:Number,  required: true, min: 1, max: 5},
    comment: { type: String, },
    createdAt : { type:Date, default:Date.now }
})

export default ReviewSchema;