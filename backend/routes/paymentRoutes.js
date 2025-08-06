import express from "express";
import { createCheckoutSession,stripeWebhookHandler } from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;

const router = express.Router();


router.post("/create-checkout-session", authenticateToken,isUser, createCheckoutSession);
router.post("/webhook",stripeWebhookHandler)
// router.post("/webhook", (req, res) => {
//   console.log("Webhook test route hit");
//   res.status(200).send("Webhook received");
// });

export default router;
