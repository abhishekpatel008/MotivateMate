const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance (this connects to PostgreSQL)
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name: motivatemate_dev
    process.env.DB_USER,      // Username: motivatemate_user
    process.env.DB_PASSWORD,  // Your password
    {
        host: process.env.DB_HOST,      // localhost
        port: process.env.DB_PORT,      // 5432
        dialect: process.env.DB_DIALECT, // postgres
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,      // Maximum number of connections
            min: 0,      // Minimum number of connections
            acquire: 30000, // Max time (ms) to get connection
            idle: 10000     // Time (ms) before idle connection closes
        }
    }
);

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        return false;
    }
};

// Close the connection (for cleanup)
const closeConnection = async () => {
    try {
        await sequelize.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error closing connection:', error);
    }
};

module.exports = { sequelize, testConnection, closeConnection };