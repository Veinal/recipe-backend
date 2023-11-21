const mongoose = require('mongoose')
const mongoURL = "mongodb://127.0.0.1/finalproject"
const connectToMongo = async()=>{
    try{
        await mongoose.connect(mongoURL)
        console.log("database connected successfully");
    }
    catch(err){
        console.log("database not connected"+err);
    }
}
module.exports=connectToMongo;