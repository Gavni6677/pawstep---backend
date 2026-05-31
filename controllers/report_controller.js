const Report = require('../models/report_model');

// פונקציה לקבלת כל הדו"חות (או היסטוריית טיולים)
const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// פונקציה ליצירת דו"ח טיול חדש
const addReport = async (req, res) => {
  const report = new Report({
    petName: req.body.petName,
    durationMinutes: req.body.durationMinutes,
    distanceKm: req.body.distanceKm,
    didPee: req.body.didPee,
    didPoo: req.body.didPoo,
    didEat: req.body.didEat,
    summary: req.body.summary
  });

  try {
    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getReports,
  addReport
};