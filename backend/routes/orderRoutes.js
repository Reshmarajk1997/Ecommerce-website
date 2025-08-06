import express from "express";
import { getAllOrders } from "../controllers/OrderHistoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;

const router = express.Router();

router.get("/orders", authenticateToken,isUser, getAllOrders);

export default router;