const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://acdemy1:mOrIep1pjV00Vv3r@cluster0.wjp1bsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

connect.then(()=>{
    console.log('success')
})
.catch(()=>{
    console.log('unseccesfull')
})
const LoginSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})
const collection = new mongoose.model("userdatas",LoginSchema)
module.exports =collection;
