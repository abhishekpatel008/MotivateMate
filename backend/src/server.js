const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const petRoutes = require('./routes/pet');
const shopRoutes = require('./routes/shop');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/pet', petRoutes);
app.use('/api/shop', shopRoutes);
const achievementRoutes = require('./routes/achievements');
app.use('/api/achievements', achievementRoutes);

const startServer = async () => {
    try {
        await testConnection();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Server failed to start:', error);
    }
};

startServer();