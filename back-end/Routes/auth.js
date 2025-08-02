import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js'

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register',async (req,res)=>{
    try{
        const {usename,email,password} =req.body;

        const userExist = await User.findOne({email})
        if(userExist) return res.status(400).json({message:'user already exists'});

        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({username,email,password:hashed});
        
        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'7d'});
        res.json({token,user:{email:user.email}});
    }catch(err){
        res.status(500).json({message:'error creating user:',err})
    }
});

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message:'could not find user'});

        const validPassword = await bcrypt.compare(user.password,password);
        if(!validPassword) return res.status(401).json({message:'incorrect password'});

        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'7d'});
        res.json({token,user:{email:user.email}})
    }catch(err){
        res.status(500).json({message:'error logging in:',err})
    }
});

export default router;
