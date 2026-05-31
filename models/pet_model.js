const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String, // למשל: "כלב" או "חתול"
    required: true
  },
  age: {
    type: Number
  },
  medicalNotes: {
    type: String,
    default: "אין רגישויות מיוחדות" // ערך ברירת מחדל במידה ולא מזינים כלום
  }
});

module.exports = mongoose.model('Pet', petSchema);