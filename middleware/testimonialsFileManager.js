const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'testimonial') {
            cb(null, 'public/images/testimonials')  // direktori penyimpanan file
        } 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))  // nama file
    }
});

const upload = multer({ storage: storage });

module.exports = upload;