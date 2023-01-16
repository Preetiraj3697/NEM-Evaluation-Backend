const express = require('express');
const app = express();
const {connection}=require("./config/db")
const {userRouter}=require("./routes/User.route")
const {authenticate}=require("./middleware/authenticate.middleware");
require("dotenv").config()
const cors=require("cors");
const { postRouter } = require('./routes/Post.route');
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Trouble connecting to the DB")
        console.log(err)

    }
    console.log(`server running at ${process.env.port}`)
})