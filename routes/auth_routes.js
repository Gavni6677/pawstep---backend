const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

// הרשמה
router.post('/register', authController.register);

// התחברות
router.post('/login', authController.login);

module.exports = router;