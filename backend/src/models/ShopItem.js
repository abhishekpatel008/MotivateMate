module.exports = (sequelize, DataTypes) => {
    const ShopItem = sequelize.define('ShopItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        item_type: {
            type: DataTypes.ENUM('food', 'toy', 'accessory', 'other'),
            allowNull: false,
            defaultValue: 'other'

        },
        effect_type: {
            type: DataTypes.ENUM('happiness', 'energy', 'health', 'cosmetic'),
            allowNull: false
        },
        effect_value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                min: 0
            }
        },
        cost_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        rarity: {
            type: DataTypes.ENUM('common', 'uncommon', 'rare', 'epic', 'legendary'),
            defaultValue: 'common'
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    },

        {
            tableName: 'shop_items',
            timestamps: false,
            underscored: true
        });


    return ShopItem;
};