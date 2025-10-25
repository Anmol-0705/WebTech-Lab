const express = require('express');
const router = express.Router();
const { createWorkout, listWorkouts } = require('../controllers/workoutController');


router.get('/', listWorkouts);
router.post('/', createWorkout);


module.exports = router;