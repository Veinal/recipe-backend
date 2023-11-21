const express=require('express')
const router = express.Router()
const user=require('../middleware/User')

const {Insert,View,ViewByAdmin,SingleView,Delete,Update}=require('../controller/requests')
router.post('/insert',user,Insert)
router.get('/view',user,View)
router.get('/viewbyadmin',ViewByAdmin)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)

module.exports=router