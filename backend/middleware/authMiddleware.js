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


const isUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.userId);

        if(!user){
           return res.status(400).json({message:"User not found"})
        }

         if (user.isAdmin) {
      return res.status(403).json({ message: "Access restricted to regular users" });
    }

       console.log("User email in isUser middleware:", user.email); // <-- debug here
     req.user = user;

    next();
    } catch (error) {
         return res.status(500).json({ message: "Server error", error: error.message });
    }
}



const isAdmin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.userId);
        
        if(!user || !user.isAdmin){
            return res.status(403).json({message:"Admin access required"})
        }
         req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export default {authenticateToken, isAdmin, isUser};