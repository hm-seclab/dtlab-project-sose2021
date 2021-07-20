// database.js

const {Sequelize, DataTypes} = require('sequelize');

// sequelize config
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    });

// table definitions
const Posts = sequelize.define('Posts', {
    post_uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // auto generated timestamps createdAt and updatedAt
    parent: {
        type: DataTypes.UUID,
        defaultValue: null,
    }
});

const Users = sequelize.define('Users', {
    user_id: { //id from keycloak
        type: DataTypes.STRING,
        primaryKey: true,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

Users.hasMany(Posts);
Posts.belongsTo(Users);

module.exports = {
    sequelize: sequelize,
    Post: Posts,
    User: Users
};