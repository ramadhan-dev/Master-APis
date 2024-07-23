const multer = require('multer');
const path = require('path');


const storage = (targetPath) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, targetPath + '/');  
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);  
            const filename = `${Date.now()}${ext}`;  
            cb(null, filename);  
        }
    })
};

module.exports = storage