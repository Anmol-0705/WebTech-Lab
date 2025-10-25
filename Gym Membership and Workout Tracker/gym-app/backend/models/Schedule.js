const mongoose = require('mongoose');


const scheduleSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
date: { type: Date, required: true },
notes: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Schedule', scheduleSchema);