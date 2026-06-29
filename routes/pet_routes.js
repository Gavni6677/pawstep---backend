const express = require('express');
const router = express.Router();
const PetController = require('../controllers/pet_controller');
// מייבאים את המידלוור שלמדת לבנות
const authMiddleware = require('../middlewares/auth_middleware'); 

// ניתוב לקבלת כל החיות - מוסיפים את authMiddleware לפני הקונטרולר
router.get('/', authMiddleware, PetController.getPets);

// ניתוב להוספת חיה חדשה - מוסיפים את authMiddleware לפני הקונטרולר
router.post('/', authMiddleware, PetController.addPet);

module.exports = router;