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

router.get('/courses',authenticateToken,async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select('courses');
        if(!user) return res.status(404).json({message:'user not found'});

        res.status(200).json({courses:user.courses})
    }catch(err){
        res.status(500).json({message:'error retrieving course',err})
    }
});

router.get('/course/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const course = user.courses.id(req.params.id); // get subdocument by _id
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get course', err });
  }
});

export default router;