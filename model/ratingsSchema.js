const mongoose = require('mongoose')
const {Schema}= mongoose;
const RateSchema= new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDetails"
    },
    ratings:{
        type:Number,
        min:1,
        max:5
    },
    reviews:{
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
module.exports=mongoose.model("Ratings",RateSchema)