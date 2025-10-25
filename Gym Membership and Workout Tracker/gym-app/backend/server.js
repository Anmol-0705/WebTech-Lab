// console.log('Gym Backend Server');
require('dotenv').config();
console.log('JWT secret present?', !!process.env.JWT_SECRET);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');


const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());


// Connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/gymdb');


// Routes
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/schedules', scheduleRoutes);


// Simple root
app.get('/', (req, res) => res.send('Gym API running'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));