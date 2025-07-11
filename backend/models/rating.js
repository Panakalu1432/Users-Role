const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Store = require('./store');
const User = require('./user');

const Rating = sequelize.define('Rating', {
  rating: { type: DataTypes.INTEGER, allowNull: false },
});

Rating.belongsTo(User);
Rating.belongsTo(Store);

module.exports = Rating;
