const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Protect routes middleware
const protect = async (req, res, next) => {
    let token;

    console.log('=== protect middleware ===');  // <========= ADD DEBUG
    console.log('Headers:', req.headers);  // <========= ADD DEBU

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
             console.log('Token received:', token.substring(0, 50) + '...');  // <========= ADD DEBUG
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log('Decoded token:', decoded);  // <========= ADD DEBUG

            req.user = await User.findByPk(decoded.id, { attributes: { exclude: ['password_hash'] } });
                console.log('User found:', req.user);  // <========= ADD DEBUG
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
            
        }
    } else {
        console.error('No token provided');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { generateToken, protect };