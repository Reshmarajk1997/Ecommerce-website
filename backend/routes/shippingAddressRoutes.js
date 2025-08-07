import express from "express";
import {
     getShippingAddress,
     updateShippingAddress
    } from "../controllers/shippingAddressController.js";
  
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;


const router = express.Router();

router.get("/", authenticateToken,isUser, getShippingAddress);


router.put("/", authenticateToken,isUser, updateShippingAddress);

export default router;