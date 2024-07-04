const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products') //upload-directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let extension = file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + uniqueSuffix + "."+extension)
    }
})

 //1 MB = 1024 KB
 //1 KB = 1024 bytes
//const fileSize= 1024 * 1024 * 2 = 2097152 bytes = 2MB
const fileSize = 2097152



const fileFilter = (req, file, cb) => {
     const fileTypes = ["jpeg", "jpg", "png", "webp", "PNG", "JPEG", "JPG", "WEBP"];
    //const fileTypes = ["jpeg", "jpg"];
    let extension = file.originalname.split('.')[1];


    if(fileTypes.includes(extension)){
        return cb(null, true); // this means file should be accepted
    }
    else {
        //cb(null, false); // this means file should not be accepted
        const error = new Error("Unsupported file type");
        error.status = 409; // Send a 400 response with an error message
        return cb(error, false);
    }
}



const upload = multer({
             storage: storage,
             limits: {
                fileSize: 102,
             },
             fileFilter: fileFilter,
       })

module.exports=upload