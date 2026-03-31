const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
    getAchievements, 
    getUserAchievements, 
    getAchievementProgress 
} = require('../controllers/achievementController');

router.use(protect);

router.get('/', getAchievements);
router.get('/user', getUserAchievements);
router.get('/progress', getAchievementProgress);

module.exports = router;