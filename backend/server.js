import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import userProductRoutes from "./routes/userProductRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import shippingAddressRoutes from "./routes/shippingAddressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", userProductRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/address", shippingAddressRoutes);
app.use("/api/orders", orderRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
