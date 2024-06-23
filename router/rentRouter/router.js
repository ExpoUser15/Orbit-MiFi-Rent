const express = require('express');
const multer = require('multer');
const path = require('path');
const { homeController, rentController, aboutController, contactController, contactPostController, rentPostController } = require('../../controllers/rentPagesController/rentPagesController');
const rentRouter = express.Router();

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

rentRouter.get('/', homeController);
rentRouter.get('/rent', rentController);
rentRouter.get('/about', aboutController);
rentRouter.get('/contact', contactController);
rentRouter.post('/contact/success', contactPostController);
rentRouter.post('/rent/success', upload.fields([{ name: 'passport', maxCount: 10 }, { name: 'boardingpass', maxCount: 1 }]), rentPostController);

module.exports = rentRouter;
