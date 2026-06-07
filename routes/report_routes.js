const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report_controller');
// מייבאים את השומר שלנו!
const authenticateToken = require('../middlewares/auth_middleware');

// ניתוב לקבלת כל הדו"חות (זה נשאיר פתוח לכולם כרגע)
router.get('/', ReportController.getReports);

// ניתוב לשליחת דו"ח חדש - שימי לב ששמנו את השומר (authenticateToken) באמצע!
router.post('/', authenticateToken, ReportController.addReport);

module.exports = router;