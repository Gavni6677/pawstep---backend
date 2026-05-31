const express = require('express');
const router = express.Router();
const PetController = require('../controllers/pet_controller');

// ניתוב לקבלת כל החיות
router.get('/', PetController.getPets);

// ניתוב להוספת חיה חדשה
router.post('/', PetController.addPet);

module.exports = router;