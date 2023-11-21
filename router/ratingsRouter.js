const express=require('express')
const router = express.Router()

const {Insert,View,SingleView,Delete,Update}=require('../controller/ratings')
router.post('/insert',Insert)
router.get('/view',View)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)

module.exports=router