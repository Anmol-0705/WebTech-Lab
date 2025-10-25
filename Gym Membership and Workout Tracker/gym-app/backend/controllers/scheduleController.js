// backend/controllers/scheduleController.js
const Schedule = require('../models/Schedule');

// createSchedule and listSchedules (existing)
const createSchedule = async (req, res) => {
  try {
    const s = await Schedule.create(req.body);
    res.status(201).json(s);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listSchedules = async (req, res) => {
  try {
    const list = await Schedule.find().populate('user workout trainer');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// NEW: list schedules for a single user (by user id)
const listSchedulesByUser = async (req, res) => {
  try {
    // Accept user id either as route param or query param
    const userId = req.params.userId || req.query.userId;
    if (!userId) return res.status(400).json({ message: 'userId required' });

    const list = await Schedule.find({ user: userId }).populate('user workout trainer').sort({ date: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSchedule, listSchedules, listSchedulesByUser };
