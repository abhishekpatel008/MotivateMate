const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getPet, useItemonPet } = require('../controllers/petController');

// Apply auth middleware to all pet routes
router.use(protect);

// Get the user's pet
router.route('/').get(getPet);

// Use an item from the inventory on the pet
router.route('/use-item').post(useItemonPet);

module.exports = router;