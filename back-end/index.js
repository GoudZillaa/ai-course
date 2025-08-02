import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from 'mongoose'

import coreRouter from './Routes/generateCore.js'
import extendedRouter from './Routes/generateExtended.js'
import videoRouter from './Routes/youtube.js'
import authRouter from './Routes/auth.js'
import userRouter from './Routes/user.js'

dotenv.config(); 
const app=express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('Database connected successfully'))
.catch((err)=>console.log('error connecting database:',err))

app.use('/api',coreRouter);
app.use('/api',extendedRouter);
app.use('/api',videoRouter);
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`) 
})