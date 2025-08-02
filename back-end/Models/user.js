
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    topic: String,
    coreConcepts: Array,
    extendedConcepts: Array,
    videoResults: Array,
    extendedVideoResults: Array,
    createdAt: {type:Date,default:Date.now}
});

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    courses:[courseSchema]
});

export default mongoose.model('User',userSchema)