const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Store = sequelize.define('Store', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false },
});

Store.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });

module.exports = Store;
