const express=require('express')
const router = express.Router()
const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, 'uploads/recipe')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now();
     cb(null, uniqueSuffix + '-' + file.originalname)
   }
 })
 const upload = multer({ storage: storage })

const {Insert,View,SingleView,Delete,Update}=require('../controller/recipes')
router.post('/insert',upload.single('image'),Insert)
router.get('/view',View)
router.get('/singleview/:id',SingleView)
router.delete('/delete/:id',Delete)
router.put('/update/:id',upload.single('image'),Update)

module.exports=router