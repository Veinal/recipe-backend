const ReqstSchema = require('../model/requestsSchema')
const Insert=async(req,res)=>{
    try{
        const {request,remarks,date,status}=req.body;
        const data = await new ReqstSchema({user_id:req.user,request,remarks,date,status})
        const savedData =await data.save()
        console.log("insertion success");
        res.send({"insertion successful":true,savedData})
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const View = async(req,res)=>{
    try{
        const data= await ReqstSchema.find({user_id:req.user})
        console.log(data);
        res.json(data)
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const ViewByAdmin = async(req,res)=>{
    try{
        const data= await ReqstSchema.find().populate("user_id")
        console.log(data);
        res.json(data)
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const SingleView=async(req,res)=>{
    try{
        let data=await ReqstSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this ID");
            return res.status(404).send("Data does not exist with this Id")
        }
        else{
            console.log(data);
            res.json(data)
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const Delete = async(req,res)=>{
    try{
        let data=await ReqstSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID")
        }
        else{
            data= await ReqstSchema.findByIdAndDelete(req.params.id)
            console.log("Data deleted successfully");
            res.json({"Success":true,"Deleted Data":data})
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const Update=async(req,res)=>{
    const {request,remarks,date,status}=req.body;
    try{
        const newData = {}
        if(request){newData.request=request}
        if(remarks){newData.remarks=remarks}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data = await ReqstSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID");
        }
        else{
            data = await ReqstSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

module.exports={Insert,View,ViewByAdmin,SingleView,Delete,Update}