const mongoose = require('mongoose')
const {Schema}= mongoose
const AdminSchema = new Schema({
    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        // required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String
    }
})
module.exports=mongoose.model("AdminDetails",AdminSchema)