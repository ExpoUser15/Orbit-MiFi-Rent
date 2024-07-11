const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'passport') {
            cb(null, 'public/images/passport')  // direktori penyimpanan file
        } else if (file.fieldname === 'boardingpass') {
            cb(null, 'public/images/boardingpass')  // direktori penyimpanan file
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // nama file
    }
});

const upload = multer({ storage: storage });

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'testimonial') {
            cb(null, 'public/images/testimonials')  // direktori penyimpanan file
        } 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // nama file
    }
});

const upload2 = multer({ storage: storage2 });

const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'bak') {
            cb(null, 'public/images/bak')  // direktori penyimpanan file
        } 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // nama file
    }
});

const uploadBAK = multer({ storage: storage3 });

module.exports = {
    upload,
    upload2,
    uploadBAK
};