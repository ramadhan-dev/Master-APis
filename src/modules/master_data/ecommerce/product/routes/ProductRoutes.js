const express = require('express');
const ProductController = require("../controllers/ProductController");
const validateFile = require(process.cwd() + '/src/validations/common/file')
const multer = require('multer');
const storage = require(process.cwd() + '/src/utility/multer')

const upload = multer({ 
    storage: storage('upload2'),
    limits: {
        fileSize: 5 * 1024 * 1024  // Batas ukuran file 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); 
        } else {
            cb(new Error('Invalid file type'), false);  
        }
    }
});


const router = express.Router();
router.post('/create-product', upload.single('file'), validateFile, ProductController.CreateProduct);
router.get("/get-all-product", ProductController.GetAllProduct);
router.delete('/delete-product/:id', ProductController.DeleteProduct);
router.put('/update-product/:id', ProductController.UpdateProduct);
router.get('/get-product/:id', ProductController.GetProduct);



module.exports = router;

