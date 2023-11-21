const express=require('express')
const router = express.Router()
const User=require('../middleware/User')

const {AddFavorites,View,SingleView,RemoveFavorites,Update}=require('../controller/favorite')
router.post('/addfavorites',User,AddFavorites)
router.get('/view',User,View)
router.get('/singleview/:id',SingleView)
router.delete('/removefavorites/:id',RemoveFavorites)
router.put('/update/:id',Update)

module.exports=router