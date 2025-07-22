import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import coreRouter from './Routes/generateCore.js'
import extendedRouter from './Routes/generateExtended.js'
import videoRouter from './Routes/youtube.js'

dotenv.config(); 
const app=express();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"]
}));

app.use(express.json());

app.use('/api',coreRouter);
app.use('/api',extendedRouter);
app.use('/api',videoRouter);
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`) 
})