const { ShopItem, UserInventory, User, sequelize } = require('../models');

// @desc Get all shop items
exports.getShopItems = async (req, res) => {
    try {
        const items = await ShopItem.findAll();
        res.json(items);
    } catch (error) {
        console.error('Error fetching shop items:', error);
        res.status(500).json({ error: 'Failed to fetch shop items' });
    }
};

// @desc User Inventory
exports.getUserInventory = async (req, res) => {
    try {
        const inventory = await UserInventory.findAll({
            where: { user_id: req.user.id },
            include: [{ model: ShopItem, as: 'ShopItem' }] // Matches association in models/index.js
        });
        res.json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};

// @desc Purchase an item
exports.purchaseItem = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { itemId } = req.body;
        const item = await ShopItem.findByPk(itemId);
        const user = await User.findByPk(req.user.id);

        if (!item) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Item not found' });
        }

        if (user.points < item.cost_points) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Not enough points' });
        }

        user.points -= item.cost_points;
        await user.save({ transaction });

        const [inventoryItem, created] = await UserInventory.findOrCreate({
            where: { user_id: user.id, item_id: item.id },
            defaults: { quantity: 1 },
            transaction
        });

        if (!created) {
            inventoryItem.quantity += 1;
            await inventoryItem.save({ transaction });
        }

        await transaction.commit();
        res.json({ message: 'Item purchased successfully', user });
    } catch (error) {
        await transaction.rollback();
        console.error('Error purchasing item:', error);
        res.status(500).json({ error: 'Failed to purchase item' });
    }
};