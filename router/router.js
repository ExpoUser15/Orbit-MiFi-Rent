const express = require('express');
const serviceRouter = express.Router();
const { homeController, rentController, aboutController, contactController, contactPostController, rentPostController, locationApiController } = require('../controllers/rentPagesController/rentPagesController');
const { penyediaController, tambahModemController } = require('../controllers/serviceController/penyediaController');
const { loginController, loginPostController, logout } = require('../controllers/serviceController/loginController');
const { authMiddleware } = require('../middleware/authController');
const { fasilitatorController } = require('../controllers/serviceController/fasilitatorController');
const { monitoringController } = require('../controllers/serviceController/superUserController/monitoringController');
const { dashboardController, addLocationsController } = require('../controllers/serviceController/superUserController/dashboardController');
const { searchController, statusUpdateController, statusDeleteController } = require('../controllers/serviceController/actionController');
const { usersController, updateUserController, deleteUserController, addUserController, searchUsersController } = require('../controllers/serviceController/superUserController/usersController');
const { testimonialsController, addTestimonialController, deleteTestimonialController } = require('../controllers/serviceController/superUserController/testimonialsController');
const { upload2, upload } = require('../middleware/testimonialsFileManager');
const { chartController } = require('../controllers/serviceController/chartController');
const notFoundController = require('../controllers/notFoundController');
const {contactSuperuserController, searchContactSuperuserController} = require('../controllers/serviceController/superUserController/contactController');

// rental 
serviceRouter.get('/', homeController);
serviceRouter.get('/rent', rentController);
serviceRouter.get('/rent/location', locationApiController);
serviceRouter.get('/about', aboutController);
serviceRouter.get('/contact', contactController);
serviceRouter.post('/contact/success', contactPostController);
serviceRouter.post('/rent/success', upload.fields([{ name: 'passport', maxCount: 10 }, { name: 'boardingpass', maxCount: 1 }]), rentPostController);

// service 
serviceRouter.get('/login', authMiddleware, loginController);
serviceRouter.get('/penyedia', authMiddleware, penyediaController);
serviceRouter.get('/fasilitator', authMiddleware, fasilitatorController);
serviceRouter.get('/fasilitator/update/status/:status/:id', statusUpdateController);
serviceRouter.get('/fasilitator/delete/status/:id', statusDeleteController);
serviceRouter.get('/superuser', authMiddleware, dashboardController);
serviceRouter.get('/superuser/monitoring', authMiddleware, monitoringController);
serviceRouter.get('/superuser/monitoring/update/status/:status/:id', statusUpdateController);
serviceRouter.get('/superuser/monitoring/delete/status/:id', statusDeleteController);
serviceRouter.get('/superuser/users', authMiddleware, usersController);
serviceRouter.get('/superuser/testimonial', authMiddleware, testimonialsController);
serviceRouter.get('/superuser/testimonial/delete/:id', deleteTestimonialController);
serviceRouter.get('/superuser/chart/api/choosen-plan', chartController);
serviceRouter.get('/superuser/chart/api/most-visited', chartController);
serviceRouter.get('/superuser/chart/api/last-week-reports', chartController);
serviceRouter.get('/superuser/contact', authMiddleware, contactSuperuserController);

serviceRouter.get('/logout', logout);

serviceRouter.post('/login/payload', loginPostController);
serviceRouter.post('/fasilitator/in-progress/search', searchController);
serviceRouter.post('/search/contact/:contact', searchContactSuperuserController);
serviceRouter.post('/search/:status', searchController);
serviceRouter.post('/search/users/:id', searchUsersController);
serviceRouter.post('/penyedia/action', tambahModemController);
serviceRouter.post('/superuser/users/update', updateUserController);
serviceRouter.post('/superuser/users/add', addUserController);
serviceRouter.post('/superuser/locations/add', addLocationsController);
serviceRouter.post('/superuser/testimonial/add', upload2.fields([{ name: 'testimonial', maxCount: 1 }]), addTestimonialController);

serviceRouter.get('/superuser/users/delete/:id', deleteUserController);

// page not found
serviceRouter.get('*', notFoundController);

module.exports = serviceRouter;