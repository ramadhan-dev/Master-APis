const multer = require('multer');
const path = require('path');


const storage = (target) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, target + '/');  // Folder tempat file akan disimpan
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);  // Ekstensi file
            const filename = `${Date.now()}${ext}`;  // Nama file unik berdasarkan timestamp
            cb(null, filename);  // Nama file yang akan disimpan
        }
    })
};

module.exports = storage