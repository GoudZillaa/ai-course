import express from 'express';
import User from '../Models/user.js';
import { authenticateToken } from '../Middleware/auth.js';

const router = express.Router();

router.post('/save-course',authenticateToken,async(req,res)=>{
    try{
        const {topic,coreConcepts,extendedConcepts,videoResults,extendedVideoResults}=req.body;
    
        const user = await User.findById(req.userId);
        if(!user) return res.status(404).json({message:'user not found'});

        user.courses.push({
            topic,coreConcepts,extendedConcepts,videoResults,extendedVideoResults
        });

        await user.save();
        res.status(200).json({message:'course saved successfully'})
    }catch(err){
        res.status(500).json({message:'Failed to save course',err})
    }
});

router.get('/my-course',authenticateToken,async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select('cources');
        if(!user) return res.status(404).json({message:'user not found'});

        res.status(200).json(user.courses)
    }catch(err){
        res.status(500).json({message:'error retrieving course',err})
    }
});

export default router;