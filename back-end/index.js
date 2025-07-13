const cors =require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app=express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})