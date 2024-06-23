const express = require('express');
const serviceRouter = express.Router();
const { penyediaController, tambahModemController } = require('../../controllers/serviceController/penyediaController');
const { loginController, loginPostController, logout } = require('../../controllers/serviceController/loginController');
const { authMiddleware } = require('../../middleware/authController');
const { fasilitatorController } = require('../../controllers/serviceController/fasilitatorController');
const { monitoringController } = require('../../controllers/serviceController/superUserController/monitoringController');
const { dashboardController } = require('../../controllers/serviceController/superUserController/dashboardController');
const { searchController, statusUpdateController, statusDeleteController } = require('../../controllers/serviceController/actionController');
const { usersController, updateUserController, deleteUserController, addUserController } = require('../../controllers/serviceController/superUserController/usersController');

serviceRouter.get('/login', loginController);
serviceRouter.get('/penyedia', penyediaController);
serviceRouter.get('/fasilitator', fasilitatorController);
serviceRouter.get('/fasilitator/update/status/:status/:id', statusUpdateController);
serviceRouter.get('/superuser/monitoring/update/status/:status/:id', statusUpdateController);
serviceRouter.get('/fasilitator/delete/status/:id', statusDeleteController);
serviceRouter.get('/superuser/monitoring/delete/status/:id', statusDeleteController);
serviceRouter.get('/superuser', dashboardController);
serviceRouter.get('/superuser/monitoring', monitoringController);
serviceRouter.get('/superuser/users', usersController);
serviceRouter.get('/logout', logout);

serviceRouter.post('/login/payload', loginPostController);
serviceRouter.post('/fasilitator/in-progress/search', searchController);
serviceRouter.post('/search/:status', searchController);
serviceRouter.post('/penyedia/action', tambahModemController);
serviceRouter.post('/superuser/users/update', updateUserController);
serviceRouter.post('/superuser/users/add', addUserController);

serviceRouter.get('/superuser/users/delete/:id', deleteUserController);


module.exports = serviceRouter;