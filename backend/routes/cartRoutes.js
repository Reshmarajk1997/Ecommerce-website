import express from "express";
import { addToCart,getCartItems,removeCartItem,updateCartItemQuantity } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;

const router = express.Router();

router.post("/", authenticateToken, isUser, addToCart);
router.get("/", authenticateToken, isUser, getCartItems);
router.patch("/update", authenticateToken, isUser, updateCartItemQuantity);
router.delete("/remove", authenticateToken, isUser, removeCartItem);

export default router;