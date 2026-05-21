const express = require('express');
const router = express.Router(); 
const SitterController = require('../controllers/sitter_controller'); 

// ניתוב לקבלת כל נותני השירות (עמוד 30 במדריך)
router.get('/', SitterController.getSitters); 

// ניתוב לקבלת נותן שירות ספציפי לפי ה-ID שלו (עמוד 38 במדריך)
router.get('/:id', SitterController.getSitters); 

// ניתוב ליצירת נותן שירות חדש (עמוד 30 במדריך)
router.post('/', SitterController.addSitter); 

module.exports = router; 