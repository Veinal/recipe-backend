const AdminSchema = require('../model/adminRegSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_SECRET= "admin"

const Register=async(req,res)=>{
    try{
        const {adminName,adminEmail,adminPassword,date,status}=req.body;
        // const profilePic=req.file.filename;
        const salt=await bcrypt.genSalt(10)
        console.log();
        const secpass=await bcrypt.hash(adminPassword,salt)

        const data = await new AdminSchema({adminName,adminEmail,adminPassword:secpass,date,status})
        const savedData =await data.save()
        console.log("insertion success");
        res.send({"insertion successful":true,savedData})
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const Login=async(req,res)=>{
    const {adminEmail,adminPassword}=req.body
    try{
        let admin =await AdminSchema.findOne({adminEmail})
        console.log(admin,"admin");
        if(!admin){
            return res.json({error:"Invalid credential email"})
        }
        const passwordCompare=await bcrypt.compare(adminPassword,admin.adminPassword)
        if(!passwordCompare){
            const success=false;
            return res.json({success,error:"Invalid credential password"})
        }

        const data=admin.id;
        console.log(admin.id);
        const admintoken=jwt.sign(data,JWT_SECRET)
        const success=true;
        console.log({success,admintoken,admin})
        res.json({success,admintoken,admin})
    }
    catch(error){
        console.error("some error occured!!",error)
        res.status(500).json("some internal error!!!")
    }
}

const View = async(req,res)=>{
    try{
        const data= await AdminSchema.find()
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
        let data=await AdminSchema.findById(req.params.id)
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
        let data=await AdminSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID")
        }
        else{
            data= await AdminSchema.findByIdAndDelete(req.params.id)
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
    const {adminName,adminEmail,adminPassword,profilePic,date,status}=req.body;
    try{
        const newData = {}
        if(adminName){newData.adminName=adminName}
        if(adminEmail){newData.adminEmail=adminEmail}
        if(adminPassword){newData.adminPassword=adminPassword}
        if(profilePic){newData.profilePic=profilePic}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data = await AdminSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID");
        }
        else{
            data = await AdminSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const PostImage=async(req,res)=>{
    try{
        const profilePic=req.file.filename;
        const data = await new AdminSchema({profilePic})
        const savedData=data.save()
        console.log("Image inserted successfully")
        res.send({"successful":true,savedData})
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

module.exports={Register,Login,View,SingleView,Delete,Update,PostImage}