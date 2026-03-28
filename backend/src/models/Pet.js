module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define('Pet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 100]
            }
        },


        type: {
            type: DataTypes.ENUM('dog', 'cat', 'other'),
            allowNull: false,
            defaultValue: 'cat'
        },

        // created_at: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW
        // },

        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
            validate: {
                min: 1,
                max: 100
            }
        },

        experience: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                min: 0
            }
        },

        happiness: {
            type: DataTypes.INTEGER,
            defaultValue: 50,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },

        hunger: {
            type: DataTypes.INTEGER,
            defaultValue: 50,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },

        energy: {
            type: DataTypes.INTEGER,
            defaultValue: 50,
            allowNull: false,
            validate: {
                min: 0,
                max: 100
            }
        },

        last_interaction: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'pets',
        timestamps: true,
        underscored: true
    });

    return Pet;
};
