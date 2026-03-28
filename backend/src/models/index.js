const sequelize = require('../config/database');
const dataTypes = require('sequelize');

const User = require('./User')(sequelize, dataTypes);
const Pet = require('./Pet')(sequelize, dataTypes);
const Task = require('./Task')(sequelize, dataTypes);
const ShopItem = require('./ShopItem')(sequelize, dataTypes);
const UserInventory = require('./UserInventory')(sequelize, dataTypes);
const Achievement = require('./Achievement')(sequelize, dataTypes);
const UserAchievement = require('./UserAchievement')(sequelize, dataTypes);

// Define associations
User.hasOne(Pet, { foreignKey: 'userId', onDelete: 'CASCADE' });
Pet.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

ShopItem.hasMany(UserInventory, { foreignKey: 'shopItemId', onDelete: 'CASCADE' });
UserInventory.belongsTo(ShopItem, { foreignKey: 'shopItemId' });
UserInventory.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(UserInventory, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: 'userId', otherKey: 'achievementId', as: 'achievements' });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: 'achievementId', otherKey: 'userId', as: 'users' });

module.exports = { sequelize, User, Pet, Task, ShopItem, UserInventory, Achievement, UserAchievement };