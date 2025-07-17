import express from "express";
import {
  addProduct,
  getAllProducts,
  checkProductExists,
  updateProductById,
  deleteProductById,
  getProductById,
  getAllUsers
} from "../controllers/adminProductControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const { authenticateToken, isAdmin } = authMiddleware;
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  isAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "colorImage_0", maxCount: 1 },
    { name: "colorImage_1", maxCount: 1 },
    { name: "colorImage_2", maxCount: 1 },
    { name: "colorImage_3", maxCount: 1 },
  ]),
  addProduct
);

router.get("/check", checkProductExists);

router.get("/",authenticateToken,isAdmin, getAllProducts);

router.get("/users",authenticateToken,isAdmin, getAllUsers);

router.delete('/:id', authenticateToken,isAdmin,deleteProductById);

router.put('/:id', authenticateToken,isAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "colorImage_0", maxCount: 1 },
    { name: "colorImage_1", maxCount: 1 },
    { name: "colorImage_2", maxCount: 1 },
    { name: "colorImage_3", maxCount: 1 },
  ]),
  updateProductById
)

router.get('/:id', authenticateToken, isAdmin, getProductById);






export default router;
