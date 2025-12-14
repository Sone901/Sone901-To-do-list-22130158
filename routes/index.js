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
const { verifyToken } = require('../middleware/auth');

// path: routes\index.js
console.log('Router loaded');

// Public routes
router.get('/', homeController.home);
router.get('/login', loginController.login);
router.post('/login', loginController.createSession);
router.get('/register', registerController.register);
router.post('/register', registerController.createUser);

// Protected routes - require JWT authentication
router.get('/dashboard', verifyToken, dashboardController.dashboard);
router.get('/completedtask', verifyToken, completedtaskController.completedtask);

// Profile routes - protected
router.get('/profile', verifyToken, profileController.profile);
router.post('/profile/update', verifyToken, upload.single('image'), profileController.updateProfile);

// Avatar routes - protected
router.get('/api/avatar-styles', verifyToken, avatarController.getAvatarStyles);
router.get('/api/avatar/generate', verifyToken, avatarController.generateAvatar);
router.post('/api/avatar/set', verifyToken, avatarController.setUserAvatar);

module.exports = router;