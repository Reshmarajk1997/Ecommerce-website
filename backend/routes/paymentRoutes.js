import express from "express";
import { createCheckoutSession,stripeWebhookHandler,getStripeSession } from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;

const router = express.Router();


router.post("/create-checkout-session", authenticateToken,isUser, createCheckoutSession);
router.post("/webhook",stripeWebhookHandler)
router.get('/session/:sessionId', getStripeSession);

export default router;
