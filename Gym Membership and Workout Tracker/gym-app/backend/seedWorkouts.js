// backend/seedWorkouts.js
require('dotenv').config();
const mongoose = require('mongoose');

const Workout = require('./models/Workout'); // ensure this path matches your project

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/gymdb';

const sample = [
  { title: 'Full Body Beginner', description: 'Light full body workout', durationMinutes: 30, difficulty: 'Beginner' },
  { title: 'Cardio Blast', description: 'High intensity cardio', durationMinutes: 25, difficulty: 'Intermediate' },
  { title: 'Strength Training', description: 'Upper & lower strength', durationMinutes: 45, difficulty: 'Advanced' },
  { title: 'Yoga Flow', description: 'Flexibility and breathing', durationMinutes: 40, difficulty: 'Beginner' }
];

async function seed() {
  try {
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Mongo');
    // Optional: clear existing workouts
    // await Workout.deleteMany({});
    const inserted = await Workout.insertMany(sample);
    console.log('Inserted workouts:', inserted.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
