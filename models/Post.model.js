const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title: String,
    body:String,
    device: {
        type: String,
        enum: {
          values: ["PC", "TABLET", "MOBILE"],
          message: `value is not supported`,
        },
      },
    userID:String
})

const PostModel=mongoose.model("post",postSchema)

module.exports={
   PostModel
}