const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

// הרשמה
router.post('/register', authController.register);

// התחברות
router.post('/login', authController.login);

// התחברות באמצעות גוגל
router.post('/google', authController.googleLogin);

module.exports = router;