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
  },
 // בתוך petSchema:
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: String,
    required: false,
    default: 'http://localhost:3000/public/default-pet.png'
  }
});

module.exports = mongoose.model('Pet', petSchema);