const express=require('express')
const router = express.Router()
const user=require('../middleware/User')

const {Insert,View,SingleView,Delete,Update, ViewAll}=require('../controller/ratings')
router.post('/insert',user,Insert)
router.get('/view',user,View)
router.get('/viewall',ViewAll)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)

module.exports=router