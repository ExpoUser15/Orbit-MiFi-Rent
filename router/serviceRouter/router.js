const express = require('express');
const serviceRouter = express.Router();
const { penyediaController } = require('../../controllers/serviceController/penyediaController');
const { loginController, loginPostController, logout } = require('../../controllers/serviceController/loginController');
const { authMiddleware } = require('../../middleware/authController');
const { fasilitatorController } = require('../../controllers/serviceController/fasilitatorController');
const { monitoringController } = require('../../controllers/serviceController/superUserController/monitoringController');

serviceRouter.get('/login', loginController);
serviceRouter.post('/login/payload', loginPostController);
serviceRouter.get('/penyedia', penyediaController);
serviceRouter.get('/fasilitator', fasilitatorController);
serviceRouter.get('/superuser/monitoring', monitoringController);
serviceRouter.get('/logout', logout);

module.exports = serviceRouter;