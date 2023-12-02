const express=require('express')
const router = express.Router()
const User=require('../middleware/User')

const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'uploads/users')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now();
     cb(null, uniqueSuffix + '-' + file.originalname)
   }
 })
 const upload = multer({ storage: storage })

const {Register,Login,View,SingleView,Delete,Update}=require('../controller/registration')
router.post('/register',upload.single('picture'),Register)
router.post('/login',Login)
router.get('/view',View)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',upload.single('picture'),Update)

module.exports=router