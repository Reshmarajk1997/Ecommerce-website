import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    shippingAddress: {
  fullName: { type: String },
  phoneNumber: { type: String },
  country: { type: String },
  city: { type: String },
  area: { type: String },
  streetAddress: { type: String },
  zipCode: { type: String },
}

})

const User = mongoose.model("User",UserSchema)
export default User