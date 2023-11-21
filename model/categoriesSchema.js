const mongoose=require('mongoose')
const {Schema} = mongoose

// const statusType = {
//     type: String,
//     required: true,
//     enum: ['0', '1'],
//     default: '0',
//     get: (v) => (v === '0' ? 'not available' : 'available'),
//     set: (v) => (v === 'not available' ? '0' : '1'),
//   };

const CategSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String
    }
})
module.exports=mongoose.model("categories",CategSchema)