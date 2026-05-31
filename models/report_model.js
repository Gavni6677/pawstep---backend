const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  durationMinutes: {
    type: Number,
    required: true
  },
  distanceKm: {
    type: Number,
    required: true
  },
  didPee: {
    type: Boolean,
    default: false
  },
  didPoo: {
    type: Boolean,
    default: false
  },
  didEat: {
    type: Boolean,
    default: false
  },
  summary: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now // שומר אוטומטית את התאריך והשעה של יצירת הדו"ח
  }
});

module.exports = mongoose.model('Report', reportSchema);