import express from "express";
import { addToCart,getCartItems } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;

const router = express.Router();

router.post("/", authenticateToken, isUser, addToCart);
router.get("/", authenticateToken, isUser, getCartItems);

export default router;