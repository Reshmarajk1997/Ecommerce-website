import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

import authenticateToken from "../middleware/authMiddleware.js";
//Register User

const registerUser = async(req,res)=>{
    const {userName,email,password} = req.body;

    const userAlreadyExist =  await User.findOne({email})
    if(userAlreadyExist){
        return res.status(400).json({message:"User already exists in this email"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    try {
        const newUser = new User({userName,email,password:hashedPassword});
        await newUser.save()
        res.status(201).json({message:"Account created..."})
    } catch (error) {
        res.status(500).json({message:"Error created account...",error: error.message})
    }
}


//Login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    console.log(email,password)

    console.log("Login route hit!");
  console.log("Email:", email);
  console.log("Password:", password)

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({message:`user with email ${email} not found`})
    }

    if (user.isAdmin) {
        return res.status(403).json({ message: "Admin accounts must use the admin login route" });
      }


    const isPasswordMatch = await bcrypt.compare(password,user.password) 

    if(!isPasswordMatch){
        return res.status(400).json({message:"Invalid User"})
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"})
    res.json({token,userId:user._id,userName:user.userName})
};

//adminlogin

const adminLogin = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({ message: `User with email ${email} not found` });
    }

    if(!user.isAdmin){
        return res.status(403).json({ message: "Admin access required" });
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"});
    res.json({token,userId:user._id,userName:user.userName,isAdmin:true})
}


//get user data


const getUserData = async(req,res)=>{
    const user = await User.findById(req.userId).select("-password")

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        userId: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin:user.isAdmin,
      });
}

export  {
    registerUser,
    loginUser,
    getUserData,
    adminLogin
}