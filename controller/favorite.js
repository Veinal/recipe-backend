const FavSchema = require('../model/favoriteSchema')
// const AddFavorites=async(req,res)=>{
//     try{
//         const {recipeID,recipeFav,date,status}=req.body;
//         const data = await new FavSchema({recipe_id:recipeID,recipeFav,date,status})
//         const savedData =await data.save()
//         console.log("insertion success");
//         res.send({"insertion successful":true,savedData})
//     }
//     catch(error){
//         console.error("some error occured!!"+error)
//         res.status(500).json("some internal error!!!")
//     }
// }

const AddFavorites = async (req, res) => {
    try {
      const { recipeID, recipeFav, date, status } = req.body;
  
      // Check if the recipe already exists in favorites for the user
      const existingFavorite = await FavSchema.findOne({
        user_id:req.user,
        recipe_id: recipeID,
        // You may associate favorites with users here for checking
        // Add user-specific identification for the query
        // For example: user_id: req.user._id (if using authentication)
      });
  
      if (existingFavorite) {
        return res.status(400).json({ message: 'Recipe already exists in favorites' });
      }
  
      const data = await new FavSchema({ recipe_id: recipeID,user_id:req.user, recipeFav, date, status });
      const savedData = await data.save();
      console.log('Insertion success');
      res.send({ 'insertion successful': true, savedData });
    } catch (error) {
      console.error('Some error occurred!!' + error);
      res.status(500).json('Some internal error!!!');
    }
  };

const View = async(req,res)=>{
    try{
        const data= await FavSchema.find({user_id:req.user}).populate("recipe_id")
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
        let data=await FavSchema.findById(req.params.id)
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

const RemoveFavorites = async(req,res)=>{
    try{
        let data=await FavSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID")
        }
        else{
            data= await FavSchema.findByIdAndDelete(req.params.id)
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
    const {userFav,recipeFav,date,status}=req.body;
    try{
        const newData = {}
        if(userFav){newData.userFav=userFav}
        if(recipeFav){newData.recipeFav=recipeFav}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data = await FavSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this ID");
            return res.status(404).send("Data does not exist with this ID");
        }
        else{
            data = await FavSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(error){
        console.error("some error occured!!"+error)
        res.status(500).json("some internal error!!!")
    }
}

module.exports={AddFavorites,View,SingleView,RemoveFavorites,Update}