import express from "express";
import { createCheckoutSession,stripeWebhookHandler } from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;

const router = express.Router();


router.post("/create-checkout-session", authenticateToken,isUser, createCheckoutSession);
router.post("/webhook",express.raw({ type: 'application/json' }), authenticateToken,isUser,stripeWebhookHandler)

export default router;
