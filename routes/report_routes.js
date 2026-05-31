const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report_controller');

// ניתוב לקבלת כל הדו"חות
router.get('/', ReportController.getReports);

// ניתוב לשליחת דו"ח חדש בסיום טיול
router.post('/', ReportController.addReport);

module.exports = router;