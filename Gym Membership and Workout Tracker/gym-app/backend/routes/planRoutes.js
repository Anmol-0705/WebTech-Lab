const express = require('express');
const router = express.Router();
const { createPlan, listPlans } = require('../controllers/planController');


router.get('/', listPlans);
router.post('/', createPlan);


module.exports = router;