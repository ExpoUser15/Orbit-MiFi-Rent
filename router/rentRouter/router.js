const express = require('express');
const { homeController, rentController, aboutController, contactController, contactPostController } = require('../../controllers/rentPagesController/rentPagesController');
const rentRouter = express.Router();

rentRouter.get('/', homeController);
rentRouter.get('/rent', rentController);
rentRouter.get('/about', aboutController);
rentRouter.get('/contact', contactController);
rentRouter.post('/contact', contactPostController);

module.exports = rentRouter;