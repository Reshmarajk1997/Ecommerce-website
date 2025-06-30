import jwt from "jsonwebtoken";
import User from "../models/User.js";



const authenticateToken = async(req,res,next)=>{
    const token = req.headers["authorization"]?.split(" ")[1];

    if(!token){
        return res.status(403).json({message:"Token required"});
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.userId =decoded.id;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });

    }
};

const isAdmin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.userId);
        
        if(!user || !user.isAdmin){
            return res.status(403).json({message:"Admin access required"})
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default {authenticateToken, isAdmin};