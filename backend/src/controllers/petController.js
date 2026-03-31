const { Pet, UserInventory, ShopItem } = require('../models');

// @desc Get pet data for the current user
exports.getPet = async (req, res) => {
    try {
        const pet = await Pet.findOne({ where: { user_id: req.user.id } });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Use an item from inventory to boost pet stats
exports.useItemonPet = async (req, res) => {
    try {
        const { inventoryId } = req.body;
        
        // Find item and include ShopItem to get effect_type and effect_value
        const inventoryItem = await UserInventory.findOne({ 
            where: { id: inventoryId, user_id: req.user.id },
            include: [{ model: ShopItem, as: 'ShopItem' }] 
        });

        if (!inventoryItem || inventoryItem.quantity <= 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const pet = await Pet.findOne({ where: { user_id: req.user.id } });
        const item = inventoryItem.ShopItem;

        // Apply dynamic effects based on item type (hunger, happiness, or energy)
        const effect = item.effect_type;
        const value = item.effect_value;

        if (effect === 'hunger') pet.hunger = Math.min(100, pet.hunger + value);
        else if (effect === 'happiness') pet.happiness = Math.min(100, pet.happiness + value);
        else if (effect === 'energy') pet.energy = Math.min(100, pet.energy + value);

        // Update inventory: subtract quantity or remove record
        if (inventoryItem.quantity > 1) {
            inventoryItem.quantity -= 1;
            await inventoryItem.save();
        } else {
            await inventoryItem.destroy();
        }

        pet.last_interaction = new Date();
        await pet.save();
        
        res.json({ message: `${item.name} used!`, pet });
    } catch (error) {
        console.error('Error using item:', error);
        res.status(500).json({ error: 'Failed to use item' });
    }
};