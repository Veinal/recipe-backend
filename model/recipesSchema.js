const mongoose= require('mongoose')
const {Schema} = mongoose;
const RecipSchema = new Schema({
    // admin_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"AdminDetails"
    // },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    recipeName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
    },
    description:{
        type:String,
    },
    instructions:{
        type:String
    },
    video:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String
    }
})
module.exports=mongoose.model("recipes",RecipSchema)