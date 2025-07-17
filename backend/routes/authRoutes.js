import express from 'express'
import {registerUser,loginUser,getUserData, adminLogin} from '../controllers/authControllers.js'
import authMiddleware from '../middleware/authMiddleware.js';
const {authenticateToken,isUser,isAdmin} = authMiddleware

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser)
router.post('/admin-login',adminLogin)
router.get("/user",authenticateToken,getUserData)


export default  router;