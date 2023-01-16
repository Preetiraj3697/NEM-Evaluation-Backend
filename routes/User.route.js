const express=require("express")
const {UserModel}=require("../models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/register",async (req,res)=>{
    const {email,password,name,gender}=req.body
    try{
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if(err){
                console.log(err)
            } else{
                const user=new UserModel({email,password:secure_password,name,gender})
            await user.save()
            res.send("Registered")
            }
        });
    }catch(err){
        res.send("Error in registering the user")
        console.log(err)
    }
})

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    try{
        const user=await UserModel.find({email})
        const hashed_pass=user[0].password
        if(user.length>0){
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if(result){
                    const token = jwt.sign({userID:user[0]._id}, 'process.env.key');
                    res.send({"msg":"Login Successfull","token":token})
                } else {
                    res.send("Wrong Credntials")
                }
            });
        } else {
            res.send("Wrong Credntials")
        }
    } catch(err){
        res.send("Something went wrong")
        console.log(err)
    }
    
})


module.exports={
    userRouter
}