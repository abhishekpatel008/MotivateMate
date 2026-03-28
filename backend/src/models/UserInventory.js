module.exports = (sequelize, DataTypes) => {
    const UserInventory = sequelize.define('UserInventory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        purchased_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'user_inventory',
        timestamps: false,
        underscored: true,
        indexes: [
            { unique: true, fields: ['user_id', 'item_id'] }
        ]
    });

    return UserInventory;
}