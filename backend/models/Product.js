import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
      operatingSystem:{
        type:String,
        required:true,
        enum:["Android",'iOS','Others']
    },
      screenSize:{
        type:String,
        required:true
    },
   
    price:{
        type:Number,
        required:true
    },
     discountPercentage :{
        type:Number,
        required:true,
        min:0,
        max:100
    },
     priceAfterDiscount:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["smartphone","tablet"]
    },
   colors:[
    {
        colorName:{type:String,required:true},
        imgUrl:{type:String}
    }
   ],
   storageVariants:[
    {
        storage:{type:String,required:true},
        stock:{type:Number,required:true,min:0}
    }
   ]

},
  {
    timestamps:true,
   }
)

const Product = mongoose.model('Product',ProductSchema);
export default Product;