const Workout = require('../models/Workout');


const createWorkout = async (req, res) => {
try {
const w = await Workout.create(req.body);
res.status(201).json(w);
} catch (err) { res.status(500).json({ message: err.message }); }
};


const listWorkouts = async (req, res) => {
const ws = await Workout.find();
res.json(ws);
};


module.exports = { createWorkout, listWorkouts };