module.exports = (sequelize, DataTypes) => {
    const Achievement = sequelize.define('Achievement', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        criteria: {
            type: DataTypes.ENUM('tasks_completed', 'points_earned', 'streak_days', 'pet_level', 'custom'),
            allowNull: false
        },
        criteria_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        reward_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50,
            validate: {
                min: 0
            }
        },

        badge_image_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'achievements',
        timestamps: true,
        underscored: true
    });

    return Achievement;
};