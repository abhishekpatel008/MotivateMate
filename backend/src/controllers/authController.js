const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../middleware/auth');
const { Op } = require('sequelize');
const { Pet } = require('../models');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

const PET_NAMES = [
    'Fluffy', 'Buddy', 'Whiskers', 'Luna', 'Max',
    'Bella', 'Charlie', 'Milo', 'Coco', 'Rocky',
    'Simba', 'Nala', 'Oreo', 'Ginger', 'Shadow',
    'Princess', 'Tiger', 'Smokey', 'Pepper', 'Ziggy'
];

const PET_TYPES = ['cat', 'dog', 'owl'];

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({ username, email, password_hash });
        const createdUser = await User.findByPk(user.id);
        if (!createdUser || !createdUser.id) {
            return res.status(500).json({ message: 'Error creating user' });
        }

        const randomPetName = PET_NAMES[Math.floor(Math.random() * PET_NAMES.length)];
        const randomPetType = PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)];
        

        const pet = await Pet.create ({
            user_id: createdUser.id,
            name: randomPetName,
            type: randomPetType,
            level: 1,
            experience: 0,
            happiness: 50,
            hunger: 50,
            energy: 50,
            last_interaction: new Date()
        });

        // Generate token
        const token = generateToken(createdUser);

        res.status(201).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                points: user.points,
                level: user.level,
                streak_days: user.streak_days
            },

            // Send whole pet object in response
            pet: {
                id: pet.id,
                name: pet.name,
                type: pet.type,
                level: pet.level,
                experience: pet.experience,
                happiness: pet.happiness,
                hunger: pet.hunger,
                energy: pet.energy,
                last_interaction: pet.last_interaction
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        // Find user by username or email
        const user = await User.findOne({ where: { [Op.or]: [{ username: identifier }, { email: identifier }] } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);


        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);



        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                points: user.points,
                level: user.level,
                streak_days: user.streak_days
            }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get current user
// @route GET /api/auth/me
// @access Private
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password_hash'] } });
        res.json({ user });
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getCurrentUser };