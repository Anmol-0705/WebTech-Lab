const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema({
title: { type: String, required: true },
description: String,
durationMinutes: Number,
difficulty: { type: String, enum: ['Beginner','Intermediate','Advanced'], default: 'Beginner' }
});


module.exports = mongoose.model('Workout', workoutSchema);