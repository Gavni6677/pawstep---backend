const Pet = require('../models/pet_model');

// פונקציה לקבלת כל חיות המחמד
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//פונקציה להוספת חחית מחמד חדשה
const addPet = async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    type: req.body.type,
    age: req.body.age,
    medicalNotes: req.body.medicalNotes,
    photo: req.body.photo,
    // השרת מושך את המזהה ישירות מהטוקן המפוענח!
    ownerId: req.user._id 
  });

  try {
    const savedPet = await pet.save();
    res.status(201).json(savedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getPets,
  addPet
};