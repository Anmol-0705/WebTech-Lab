// backend/routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const { createSchedule, listSchedules, listSchedulesByUser } = require('../controllers/scheduleController');

// All schedules (admin-ish)
router.get('/', listSchedules);

// Create schedule
router.post('/', createSchedule);

// NEW: schedules for a specific user
router.get('/user/:userId', listSchedulesByUser);

// Optionally also support query param ?userId=...
router.get('/by-user', listSchedulesByUser);

module.exports = router;
