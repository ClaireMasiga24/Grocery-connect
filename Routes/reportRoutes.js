const express = require('express');
const router = express.Router();
const Report = require('../Models/reportModels');

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get reports by type
router.get('/:type', async (req, res) => {
  try {
    const reports = await Report.find({ type: req.params.type });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new report
router.post('/', async (req, res) => {
  const report = new Report({
    type: req.body.type,
    data: req.body.data,
    branch: req.body.branch
  });

  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;