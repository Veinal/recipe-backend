const express=require('express')
const connectToMongo=require('./database')
const cors = require('cors')

const app=express()
app.use(express.json())
app.use(cors())

app.use('/api/adminreg',require('./router/adminRegRouter'))
app.use('/api/categories',require('./router/categoriesRouter'))
app.use('/api/ratings',require('./router/ratingsRouter'))
app.use('/api/recipes',require('./router/recipesRouter'))
app.use('/api/registration',require('./router/registerRouter'))
app.use('/api/request',require('./router/requestsRouter'))
app.use('/api/favorites',require('./router/favoriteRouter'))

app.use('/uploads/admin',express.static('./uploads/admin'))
app.use('/uploads/users',express.static('./uploads/users'))
app.use('/uploads/recipe',express.static('./uploads/recipe'))

port = 7000;
app.listen(port,()=>{
    console.log("app is listening to port"+ port);
})
 connectToMongo()