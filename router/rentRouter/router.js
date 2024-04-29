const express = require('express');
const multer = require('multer');
const path = require('path');
const { homeController, rentController, aboutController, contactController, contactPostController, rentPostController } = require('../../controllers/rentPagesController/rentPagesController');
const rentRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/passport')  // direktori penyimpanan file
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
rentRouter.post('/rent/success', upload.array('passport', 2), rentPostController);

module.exports = rentRouter;