const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

// נתיב להתחברות
router.post('/login', authController.login);

module.exports = router;