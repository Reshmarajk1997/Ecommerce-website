import express from "express";
import { getAllProducts } from "../controllers/userProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;


const router = express.Router();



router.get('/', authenticateToken, isUser,getAllProducts);
//  router.get('/',getAllProducts);


export default router;
