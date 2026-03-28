// verify-all.js - Complete verification script
const { sequelize, User, Pet, Task, ShopItem, UserInventory, Achievement, UserAchievement } = require('./src/models');
const bcrypt = require('bcryptjs');

async function verifyAll() {
    console.log('MOTIVATEMATE VERIFICATION\n');
    
    let passed = 0;
    let failed = 0;
    
    // 1. Check database connection
    try {
        await sequelize.authenticate();
        console.log('Database connection');
        passed++;
    } catch (e) {
        console.log('Database connection:', e.message);
        failed++;
    }
    
    // 2. Check all models exist
    const models = { User, Pet, Task, ShopItem, UserInventory, Achievement, UserAchievement };
    for (const [name, model] of Object.entries(models)) {
        if (typeof model === 'function') {
            console.log(`Model: ${name}`);
            passed++;
        } else {
            console.log(`Model: ${name} not found`);
            failed++;
        }
    }
    
    // 3. Test CRUD
    try {
        const hash = await bcrypt.hash('test', 10);
        const user = await User.create({
            username: 'verify_' + Date.now(),
            email: 'verify' + Date.now() + '@test.com',
            password_hash: hash
        });
        console.log('CRUD: Create user');
        passed++;
        
        const pet = await Pet.create({ user_id: user.id, name: 'VerifyPet', type: 'dog'});
        console.log('CRUD: Create pet');
        passed++;
        
        const found = await User.findByPk(user.id, { include: [{ model: Pet, as: 'pet' }] });

        if (found.pet && found.pet.id === pet.id) {
            console.log('CRUD: Read user with pet');
            passed++;
        } else {
            console.log('CRUD: Association failed');
            failed++;
        }
        
        await user.update({ points: 50 });
        const updated = await User.findByPk(user.id);
        if (updated.points === 50) {
            console.log('CRUD: Update user');
            passed++;
        } else {
            console.log('CRUD: Update failed');
            failed++;
        }

        await user.destroy();
        const deleted = await User.findByPk(user.id);
        if (!deleted) {
            console.log('CRUD: Delete user');
            passed++;
        } else {
            console.log('CRUD: Delete failed');
            failed++;
        }
    } catch (e) {
        console.log('CRUD operations failed:', e.message);
        failed += 5; // Count all CRUD steps as failed
    }

    console.log('\n📊 RESULTS:');
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    
    await sequelize.close();
}

verifyAll();