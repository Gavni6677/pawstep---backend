const mongoose = require('mongoose');

const sitterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  cost: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sitter', sitterSchema); 