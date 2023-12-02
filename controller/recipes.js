const RecipSchema = require('../model/recipesSchema')
const Insert=async(req,res)=>{
    try{
        const {recipeName,ingredients,description,instructions,video,date,status,category}=req.body;
        const image=req.file.filename
        const data = await new RecipSchema({recipeName,image,ingredients,description,instructions,video,date,status,category_id:category})
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
        const data= await RecipSchema.find().populate("category_id")
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
        let data=await RecipSchema.findById(req.params.id).populate("category_id")
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
        let data=await RecipSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID")
        }
        else{
            data= await RecipSchema.findByIdAndDelete(req.params.id)
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
    // console.log(req?.file?.filename)
   
    const {recipeName,ingredients,description,instructions,video,date,status,category_id}=req.body;
    const image=req?.file?.filename
    // console.log(image,'uuuuuuuuuuuuuuuuuuuuuuuuuuu')
    try{
        const newData = {}
        if(recipeName){newData.recipeName=recipeName}
        if(image){newData.image=image}
        if(ingredients){newData.ingredients=ingredients}
        if(description){newData.description=description}
        if(instructions){newData.instructions=instructions}
        if(video){newData.video=video}
        if(date){newData.date=date}
        if(status){newData.status=status}
        if(category_id){newData.category_id=category_id}

        let data = await RecipSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID");
        }
        else{
            data = await RecipSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

module.exports={Insert,View,SingleView,Delete,Update}