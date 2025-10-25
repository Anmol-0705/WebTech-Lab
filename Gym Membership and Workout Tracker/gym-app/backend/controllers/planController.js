// planController.js (CommonJS)
const Plan = require('../models/plan');   // <- correct



const createPlan = async (req, res) => {
try {
const p = await Plan.create(req.body);
res.status(201).json(p);
} catch (err) { res.status(500).json({ message: err.message }); }
};


const listPlans = async (req, res) => {
const plans = await Plan.find();
res.json(plans);
};


module.exports = { createPlan, listPlans };