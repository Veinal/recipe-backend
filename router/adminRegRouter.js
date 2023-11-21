const express=require('express')
const router = express.Router()
const Admin=require('../middleware/Admin')
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'uploads/admin')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now();
     cb(null, uniqueSuffix + '-' + file.originalname)
   }
 })
const upload = multer({ storage: storage })

const {Register,Login,View,SingleView,Delete,Update,PostImage}=require('../controller/adminReg')
// router.post('/register',upload.single('profilePic'),Register)
router.post('/register',Register)
router.post('/login',Login)
router.get('/view',View)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',Update)
router.post('/postimage',PostImage)

module.exports=router