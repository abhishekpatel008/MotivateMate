const { Achievement, UserAchievement, User } = require('../models');
const { sequelize } = require('../config/database');

// @desc Get all achievements
// @route GET /api/achievements
exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.findAll();
        res.json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
};

// @desc Get user's earned achievements
// @route GET /api/achievements/user
exports.getUserAchievements = async (req, res) => {
    try {
        const userAchievements = await UserAchievement.findAll({
            where: { user_id: req.user.id },
            include: [{ model: Achievement, as: 'Achievement' }]
        });
        res.json(userAchievements);
    } catch (error) {
        console.error('Error fetching user achievements:', error);
        res.status(500).json({ error: 'Failed to fetch user achievements' });
    }
};

// @desc Check and award achievements (called after actions)
exports.checkAndAwardAchievements = async (userId) => {
    const transaction = await sequelize.transaction();
    
    try {
        // Get user data
        const user = await User.findByPk(userId);
        const userAchievements = await UserAchievement.findAll({
            where: { user_id: userId },
            attributes: ['achievement_id']
        });
        
        const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));
        
        // Get all achievements
        const achievements = await Achievement.findAll();
        
        // Calculate user stats
        const stats = {
            tasks_completed: await getCompletedTasksCount(userId),
            points_earned: user.points,
            streak_days: user.streak_days,
            pet_level: await getPetLevel(userId)
        };
        
        const newlyEarned = [];
        
        // Check each achievement
        for (const achievement of achievements) {
            if (earnedIds.has(achievement.id)) continue;
            
            const criteriaValue = stats[achievement.criteria_type];
            if (criteriaValue >= achievement.criteria_value) {
                // Award achievement
                await UserAchievement.create({
                    user_id: userId,
                    achievement_id: achievement.id,
                    earned_at: new Date()
                }, { transaction });
                
                // Award bonus points
                await user.update({
                    points: user.points + achievement.reward_points
                }, { transaction });
                
                newlyEarned.push(achievement);
            }
        }
        
        await transaction.commit();
        return newlyEarned;
        
    } catch (error) {
        await transaction.rollback();
        console.error('Error checking achievements:', error);
        return [];
    }
};

// Helper functions
const getCompletedTasksCount = async (userId) => {
    const { Task } = require('../models');
    return await Task.count({
        where: { user_id: userId, completed: true }
    });
};

const getPetLevel = async (userId) => {
    const { Pet } = require('../models');
    const pet = await Pet.findOne({ where: { user_id: userId } });
    return pet ? pet.level : 1;
};

// @desc Get user's achievement progress
// @route GET /api/achievements/progress
exports.getAchievementProgress = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        
        const stats = {
            tasks_completed: await getCompletedTasksCount(req.user.id),
            points_earned: user.points,
            streak_days: user.streak_days,
            pet_level: await getPetLevel(req.user.id)
        };
        
        const achievements = await Achievement.findAll();
        const userAchievements = await UserAchievement.findAll({
            where: { user_id: req.user.id },
            attributes: ['achievement_id']
        });
        
        const earnedIds = new Set(userAchievements.map(ua => ua.achievement_id));
        
        const progress = achievements.map(ach => ({
            ...ach.toJSON(),
            earned: earnedIds.has(ach.id),
            current_value: stats[ach.criteria_type] || 0,
            progress_percent: Math.min(100, Math.floor((stats[ach.criteria_type] || 0) / ach.criteria_value * 100))
        }));
        
        res.json(progress);
    } catch (error) {
        console.error('Error fetching achievement progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
};