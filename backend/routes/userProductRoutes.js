import express from "express";
import { getAllProducts,getProductById } from "../controllers/userProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;


const router = express.Router();



router.get('/', authenticateToken, isUser,getAllProducts);

router.get('/:id',authenticateToken,isUser,getProductById);
//  router.get('/',getAllProducts);


export default router;
