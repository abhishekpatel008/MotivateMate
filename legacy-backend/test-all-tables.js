// Test all tables - database tesing script

const { sequelize, User, Pet, Task, ShopItem, UserInventory, Achievement, UserAchievement } = require('./src/models');
const bcrypt = require('bcryptjs');

    async function testAllTables() {
        console.log('\nTesting all tables...\n');
        console.log('='.repeat(30) + '\n');

        let passed = 0;
        let failed = 0;
        let user1 = null;
        let user2 = null;
        let pet1 = null;
        let pet2 = null;
        let task1 = null;
        let task2 = null;
        let inventory1 = null;
        let inventory2 = null;
        let item1 = null;
        let item2 = null;
        let achievement1 = null;
        let achievement2 = null;

        try {
            console.log('TESING USER TABLE');
            const hash = await bcrypt.hash('securepassword123', 10);
            user1 = await User.create({
                username: 'alice_' + Date.now(),
                email: 'alice' + Date.now() + '@test.com',
                password_hash: hash,
                points: 100,
                level: 2,
                streak_days: 5
            });
            console.log('User created:', user1.username);
            passed++;

            user2 = await User.create({
                username: 'bob_' + Date.now(),
                email: 'bob' + Date.now() + '@test.com',
                password_hash: hash,
                points: 150,
                level: 3,
                streak_days: 7
            });
            console.log('User created:', user2.username);
            passed++;
        } catch (e) {
            console.log('USER TABLE: Create user failed:', e.message);
            failed++;
        }

        console.log('\nTesting PET TABLE...\n');

        try {
            pet1 = await Pet.create({ user_id: user1.id, name: 'Fluffy', type: 'cat', level: 5, hunger: 20, happiness: 80, energy: 60 });
            console.log('Pet created for user:', user1.username + ': ' + pet1.name);
            passed++;

            pet2 = await Pet.create({ user_id: user2.id, name: 'Buddy', type: 'dog', level: 3, hunger: 30, happiness: 70, energy: 50 });
            console.log('Pet created for user:', user2.username + ': ' + pet2.name);
            passed++;
        } catch (e) {
            console.log('PET TABLE: Create pet failed:', e.message);
            failed++;
        }

        console.log('\nTesting TASK TABLE...\n');

        try {
            task1 = await Task.create({ user_id: user1.id, title: 'Complete Assignment', description: 'Finish the JavaScript assignment', priority: 1, difficulty: 2, points_worth: 50, due_date: new Date(Date.now() + 86400000) });
            console.log('Task created for user:', user1.username, task1.title);
            passed++;

            task2 = await Task.create({ user_id: user2.id, title: 'Read a Book', description: 'Read 20 pages of a book', priority: 2, difficulty: 1, points_worth: 15, due_date: new Date(Date.now() + 172800000) });
            console.log('Task created for user:', user2.username, task2.title);
            passed++;
        } catch (e) {
            console.log('TASK TABLE: Create task failed:', e.message);
            failed++;
        }

        console.log('\nTesting SHOP ITEM TABLE...\n');

        try {
            item1 = await ShopItem.create({ name: 'Magic Treat', description: 'A treat that boosts happiness', item_type: 'food', effect_type: 'happiness', effect_value: 20, cost_points: 30, rarity: 'uncommon' });
            console.log('Shop item created:', item1.name);
            passed++;
            item2 = await ShopItem.create({ name: 'Energy Toy', description: 'A toy that boosts energy', item_type: 'toy', effect_type: 'energy', effect_value: 15, cost_points: 25, rarity: 'common' });
            console.log('Shop item created:', item2.name);
            passed++;
        } catch (e) {
            console.log('SHOP ITEM TABLE: Create shop item failed:', e.message);
            failed++;
        }

        console.log('\nTesting USER INVENTORY TABLE...\n');

        try {
            inventory1 = await UserInventory.create({ user_id: user1.id, item_id: item1.id, quantity: 2 });
            console.log('User inventory item created for user:', user1.username);
            passed++;
            inventory2 = await UserInventory.create({ user_id: user2.id, item_id: item2.id, quantity: 1 });
            console.log('User inventory item created for user:', user2.username);
            passed++;
        } catch (e) {
            console.log('USER INVENTORY TABLE: Create user inventory item failed:', e.message);
            failed++;
        }

        console.log('\nTesting ACHIEVEMENT TABLE...\n');

        try {
            achievement1 = await Achievement.create({ name: 'First Steps', description: 'Complete your first task', criteria_type: 'task_completed', criteria_value: 1, reward_points: 20 });
            console.log('Achievement created:', achievement1.name);
            passed++;
            achievement2 = await Achievement.create({ name: 'Pet Lover', description: 'Own a pet for 7 days', criteria_type: 'streak_days', criteria_value: 7, reward_points: 100 });
            console.log('Achievement created:', achievement2.name);
            passed++;
        } catch (e) {
            console.log('ACHIEVEMENT TABLE: Create achievement failed:', e.message);
            failed++;
        }

        console.log('\nTesting USER ACHIEVEMENT TABLE...\n');

        try {
            userAchievement1 = await UserAchievement.create({ user_id: user1.id, achievement_id: achievement1.id, date_earned: new Date() });
            console.log('User achievement created for user:', user1.username);
            passed++;
            userAchievement2 = await UserAchievement.create({ user_id: user2.id, achievement_id: achievement2.id, date_earned: new Date() });
            console.log('User achievement created for user:', user2.username);
            passed++;
        } catch (e) {
            console.log('USER ACHIEVEMENT TABLE: Create user achievement failed:', e.message);
            failed++;
        }

        console.log('\nTESTING ASSOCIATIONS\n');

        try {
            userWithData = await User.findByPk(user1.id, {
                include: [
                    { model: Pet, as: 'pet' },
                    { model: Task, as: 'tasks' },
                    { model: UserInventory, as: 'inventory', include: [{ model: ShopItem, as: 'item' }] },
                    { model: Achievement, as: 'achievements' }
                ]
            });

            console.log('User with associations:', userWithData.username);
            console.log('Pet:', userWithData.pet ? userWithData.pet.name : 'No pet');
            console.log('Tasks:', userWithData.tasks.length);
            console.log('Inventory items:', userWithData.inventory.length);
            console.log('Achievements:', userWithData.achievements.length);
            passed++;
        } catch (e) {
            console.log('ASSOCIATIONS: Fetch user with associations failed:', e.message);
            failed++;
        }

        console.log('\nCLEANUP: Deleting test data...\n');

        try {
            await UserAchievement.destroy({ where: { user_id: [user1.id, user2.id] } });
            await Achievement.destroy({ where: { name: ['First Steps', 'Pet Lover'] } });
            await UserInventory.destroy({ where: { user_id: [user1.id, user2.id] } });
            await ShopItem.destroy({ where: { name: ['Magic Treat', 'Energy Toy'] } });
            await Task.destroy({ where: { user_id: [user1.id, user2.id] } });
            await Pet.destroy({ where: { user_id: [user1.id, user2.id] } });
            await User.destroy({ where: { id: [user1.id, user2.id] } });
            console.log('Test data deleted');
            passed++;
        } catch (e) {
            console.log('CLEANUP: Delete test data failed:', e.message);
            failed++;
        }

        console.log('\nRESULTS\n');
        console.log('='.repeat(30) + '\n');
        console.log(`Passed: ${passed}, Failed: ${failed}`);
        console.log('Total tests: ' + (passed + failed));

        if (failed === 0) {
            console.log('ALL TESTS PASSED!');
        } else {
            console.log('SOME TESTS FAILED. Please review the output above for details.');
        }

        console.log('\nTESTING COMPLETE\n');

        await sequelize.close();
    }

    testAllTables();