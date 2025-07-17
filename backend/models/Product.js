import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    operatingSystem: {
      type: String,
      required: true,
      enum: ["Android", "iOS", "Others"],
    },
    screenSize: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["smartphone", "tablet"],
    },
    colors: [
      {
        colorName: { type: String, required: true },
        imgUrl: { type: String },
      },
    ],
    variations: [
      {
        storage: { type: String, required: true },
        stock: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true },
        discountPercentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        priceAfterDiscount: { type: Number, required: true },
      },
    ],

    minPriceAfterDiscount: {
      type: Number,
      required: true,
    },
    maxDiscountPercentage: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
