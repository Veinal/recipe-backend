const RegistSchema = require('../model/registerSchema')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "user"

const Register=async(req,res)=>{
    try{
        const {userName,email,password,phone,date,status}=req.body;
        const picture=req.file.filename;
        const salt=await bcrypt.genSalt(10)
        console.log();
        const secpass=await bcrypt.hash(password,salt)

        const data = await new RegistSchema({userName,email,password:secpass,phone,picture,date,status})
        const savedData =await data.save()
        console.log("Registration success");
        res.send({"Registration successful":true,savedData})
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

const Login = async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await RegistSchema.findOne({email})
        console.log(user,'user log');
        if(!user){
            return res.json({error:"Invalid credential email"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            const success=false;
            return res.json({success,error: "Invalid Credential password"})
        }
        const data= user.id
        console.log(user.id);
        const authtoken=jwt.sign(data,JWT_SECRET)
        const success=true;
        res.json({success,authtoken,user})
    }
    catch(error){
        console.error(error.message)
        res.send("internal error occured!!!")
    }
}

const View = async(req,res)=>{
    try{
        const data= await RegistSchema.find()
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
        let data=await RegistSchema.findById(req.params.id)
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
        let data=await RegistSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID")
        }
        else{
            data= await RegistSchema.findByIdAndDelete(req.params.id)
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
    const {userName,email,password,phone,picture,date,status}=req.body;
    try{
        const newData = {}
        if(userName){newData.userName=userName}
        if(email){newData.email=email}
        if(password){newData.password=password}
        if(phone){newData.phone=phone}
        if(picture){newData.picture=picture}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data = await RegistSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID");
        }
        else{
            data = await RegistSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

module.exports={Register,Login,View,SingleView,Delete,Update}