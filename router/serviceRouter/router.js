const express = require('express');
const serviceRouter = express.Router();
const { penyediaController, tambahModemController } = require('../../controllers/serviceController/penyediaController');
const { loginController, loginPostController, logout } = require('../../controllers/serviceController/loginController');
const { authMiddleware } = require('../../middleware/authController');
const { fasilitatorController } = require('../../controllers/serviceController/fasilitatorController');
const { monitoringController } = require('../../controllers/serviceController/superUserController/monitoringController');
const { dashboardController } = require('../../controllers/serviceController/superUserController/dashboardController');
const { searchController, statusUpdateController, statusDeleteController } = require('../../controllers/serviceController/actionController');
const { usersController, updateUserController, deleteUserController, addUserController, searchUsersController } = require('../../controllers/serviceController/superUserController/usersController');
const { testimonialsController, addTestimonialController, deleteTestimonialController } = require('../../controllers/serviceController/superUserController/testimonialsController');
const upload = require('../../middleware/testimonialsFileManager');

serviceRouter.get('/login', loginController);
serviceRouter.get('/penyedia', authMiddleware, penyediaController);
serviceRouter.get('/fasilitator', authMiddleware, fasilitatorController);
serviceRouter.get('/fasilitator/update/status/:status/:id', statusUpdateController);
serviceRouter.get('/superuser/monitoring/update/status/:status/:id', statusUpdateController);
serviceRouter.get('/fasilitator/delete/status/:id', statusDeleteController);
serviceRouter.get('/superuser/monitoring/delete/status/:id', statusDeleteController);
serviceRouter.get('/superuser', authMiddleware, dashboardController);
serviceRouter.get('/superuser/monitoring', authMiddleware, monitoringController);
serviceRouter.get('/superuser/users', authMiddleware, usersController);
serviceRouter.get('/superuser/testimonial', authMiddleware, testimonialsController);
serviceRouter.get('/superuser/testimonial/delete/:id', deleteTestimonialController);
serviceRouter.get('/logout', logout);

serviceRouter.post('/login/payload', loginPostController);
serviceRouter.post('/fasilitator/in-progress/search', searchController);
serviceRouter.post('/search/:status', searchController);
serviceRouter.post('/search/users/:id', searchUsersController);
serviceRouter.post('/penyedia/action', tambahModemController);
serviceRouter.post('/superuser/users/update', updateUserController);
serviceRouter.post('/superuser/users/add', addUserController);
serviceRouter.post('/superuser/testimonial/add', upload.fields([{ name: 'testimonial', maxCount: 1 }]), addTestimonialController);

serviceRouter.get('/superuser/users/delete/:id', deleteUserController);


module.exports = serviceRouter;