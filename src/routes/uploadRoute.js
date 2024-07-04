const express =require('express');
const UploadController = require("../controllers/upload/UploadController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../middlewares/IsAdmin");
const upload = require("../helper/UploadFile");


const router = express.Router();



router.post('/upload-image', upload.single("image"), UploadController.UploadImage);





module.exports=router;

