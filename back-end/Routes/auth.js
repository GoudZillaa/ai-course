import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js'
import connectDB from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        await connectDB();
        const { username, email, password } = req.body;
        if (!process.env.JWT_SECRET) throw new Error("Server configuration error (JWT_SECRET missing)");

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { email: user.email, username: user.username } });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        await connectDB();
        const { email, password } = req.body;
        if (!process.env.JWT_SECRET) throw new Error("Server configuration error (JWT_SECRET missing)");

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Could not find user' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Incorrect password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { email: user.email, username: user.username } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

export default router;
