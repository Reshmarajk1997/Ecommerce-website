import express from "express";
import { getAllProducts,getProductById,addReview,getProductReviews } from "../controllers/userProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isUser } = authMiddleware;


const router = express.Router();



router.get('/', getAllProducts);

router.get('/:id',getProductById);
router.post('/:id/reviews',authenticateToken,isUser,addReview)
router.get('/:id/reviews',authenticateToken,isUser,getProductReviews)
//  router.get('/',getAllProducts);


export default router;
