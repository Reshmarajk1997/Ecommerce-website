import Product from "../models/Product.js";

import Order from "../models/Order.js";



export const getAllOrders = async (req, res) => {
  try {
    // Fetch orders and populate product and user info
    const orders = await Order.find({})
      .populate("user", "userName email")
      .sort({ createdAt: -1 });

    

    const totalOrders = await Order.countDocuments();

    res.json({ totalOrders, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching all orders" });
  }
};
