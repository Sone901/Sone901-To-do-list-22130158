const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const dashboardController = require('../controllers/dashboardController');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const completedtaskController = require('../controllers/completedtaskController');
const avatarController = require('../controllers/avatarController');
const profileController = require('../controllers/profileController');
const upload = require('../config/multer');

// path: routes\index.js
console.log('Router loaded');

router.get('/', homeController.home);
router.get('/login', loginController.login);
router.post('/login', loginController.createSession);
router.get('/dashboard', dashboardController.dashboard)
router.get('/register', registerController.register);
router.post('/register', registerController.createUser);
router.get('/completedtask', completedtaskController.completedtask);

// Profile routes
router.get('/profile', profileController.profile);
router.post('/profile/update', upload.single('image'), profileController.updateProfile);

// Avatar routes
router.get('/api/avatar-styles', avatarController.getAvatarStyles);
router.get('/api/avatar/generate', avatarController.generateAvatar);
router.post('/api/avatar/set', avatarController.setUserAvatar);

module.exports = router;