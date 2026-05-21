const Sitter = require('../models/sitter_model');
const mongoose = require('mongoose');

// פונקציה לקבלת כל נותני השירות או אחד ספציפי לפי מזהה (עמודים 37, 39 במדריך)
const getSitters = async (req, res) => { 
  try {
    let sitters;
    if (req.params.id) {
      // חיפוש לפי ה-ID הייחודי של מונגו (עמוד 39 במדריך)
      sitters = await Sitter.findById(new mongoose.Types.ObjectId(req.params.id)); 
    } else {
      sitters = await Sitter.find(); 
    }
    res.json(sitters); 
  } catch (err) {
    res.status(404).json({ error: err.message }); 
  }
};

// פונקציה להוספת נותן שירות חדש (עמודים 28, 31 במדריך)
const addSitter = async (req, res) => { 
  console.log(req.body); 
  
  const sitter = new Sitter({ 
    name: req.body.name, 
    cost: req.body.cost,
    bio: req.body.bio
  });

  try {
    const savedSitter = await sitter.save(); 
    res.status(200).send({ status: 'ok', sitter: savedSitter }); 
  } catch (err) {
    res.status(400).send({ status: 'fail', message: err.message }); 
  }
};

module.exports = { 
  getSitters, 
  addSitter 
};