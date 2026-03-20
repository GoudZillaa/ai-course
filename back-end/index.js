import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from 'mongoose'

import coreRouter from './Routes/generateCore.js'
import extendedRouter from './Routes/generateExtended.js'
import videoRouter from './Routes/youtube.js'
import authRouter from './Routes/auth.js'
import userRouter from './Routes/user.js'
//test commit 
dotenv.config();
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('error connecting database:', err))

app.use('/api', coreRouter);
app.use('/api', extendedRouter);
app.use('/api', videoRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.3.0', timestamp: new Date().toISOString() });
});

app.get('/api/ping-ai', async (req, res) => {
    try {
        const result = {
            hasCoreToken: !!(process.env.OPENAI_API_KEY || process.env.GITHUB_TOKEN),
            backendUrl: process.env.VITE_BACKEND_URL || 'Not Set',
            frontendUrl: process.env.FRONTEND_URL || 'Not Set'
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

export default app;