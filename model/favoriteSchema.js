const mongoose=require('mongoose')
const {Schema}=mongoose
const FavSchema= new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDetails"
    },
    recipe_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"recipes"
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,

    }
})
module.exports=mongoose.model("Favorites",FavSchema)