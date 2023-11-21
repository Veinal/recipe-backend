const mongoose = require('mongoose')
const {Schema} = mongoose
const ReqstSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userDetails"
    },
    request:{
        type:String,
        require:true
    },
    remarks:{
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
module.exports=mongoose.model("Requests",ReqstSchema)