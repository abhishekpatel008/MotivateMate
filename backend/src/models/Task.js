module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
            defaultValue: 'medium'
        },
        difficulty: {
            type: DataTypes.ENUM('easy', 'medium', 'hard'),
            defaultValue: 'medium'
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        points_worth: {
            type: DataTypes.INTEGER,
            defaultValue: 10,
            validate: {
                min: 0
            }
        },
        points_earned: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    }, {
        tableName: 'tasks',
        timestamps: true,
        underscored: true,
        indexes: [
            { fields: ['user_id', 'completed'] },
            { fields: ['due_date'] }
        ]
    });

    return Task;
};