import express from 'express';
import User from '../Models/user.js';
import { authenticateToken } from '../Middleware/auth.js';
import connectDB from '../db.js';

const router = express.Router();

router.post('/save-course', authenticateToken, async (req, res) => {
  try {
    await connectDB();
    const { topic, coreConcepts, extendedConcepts, videoResults, extendedVideoResults } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.courses.push({
      topic, coreConcepts, extendedConcepts, videoResults, extendedVideoResults
    });

    await user.save();
    res.status(200).json({ message: 'Course saved successfully' });
  } catch (err) {
    console.error("Save Course failed:", err);
    res.status(500).json({ message: 'Failed to save course', error: err.message });
  }
});

router.get('/courses', authenticateToken, async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.userId).select('courses');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ courses: user.courses });
  } catch (err) {
    console.error("Get Courses failed:", err);
    res.status(500).json({ message: 'Error retrieving courses', error: err.message });
  }
});

router.get('/course/:id', authenticateToken, async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const course = user.courses.id(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    console.error("Get Course ID failed:", err);
    res.status(500).json({ message: 'Failed to get course', error: err.message });
  }
});

export default router;