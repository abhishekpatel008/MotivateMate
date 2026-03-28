const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Pet = require('./Pet')(sequelize, DataTypes);
const Task = require('./Task')(sequelize, DataTypes);
const ShopItem = require('./ShopItem')(sequelize, DataTypes);
const UserInventory = require('./UserInventory')(sequelize, DataTypes);
const Achievement = require('./Achievement')(sequelize, DataTypes);
const UserAchievement = require('./UserAchievement')(sequelize, DataTypes);

// Define associations
User.hasOne(Pet, { foreignKey: 'user_id', as: 'pet', onDelete: 'CASCADE'});
Pet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

ShopItem.hasMany(UserInventory, { foreignKey: 'item_id', as: 'inventory', onDelete: 'CASCADE' });
UserInventory.belongsTo(ShopItem, { foreignKey: 'item_id', as: 'item' });
UserInventory.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
User.hasMany(UserInventory, { foreignKey: 'user_id', as: 'inventory', onDelete: 'CASCADE' });

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: 'user_id', otherKey: 'achievementId', as: 'achievements' });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: 'achievementId', otherKey: 'user_id', as: 'users' });

module.exports = { sequelize, User, Pet, Task, ShopItem, UserInventory, Achievement, UserAchievement };