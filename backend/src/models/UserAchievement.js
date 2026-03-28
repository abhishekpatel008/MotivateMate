module.exports = (sequelize, DataTypes) => {
    const UserAchievement = sequelize.define('UserAchievement', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        achievement_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        earned_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'user_achievements',
        timestamps: true,
        underscored: true,
        indexes: [
            { unique: true, fields: ['user_id', 'achievement_id'] }
        ]
    });

    return UserAchievement;
};