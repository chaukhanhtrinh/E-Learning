'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment);
    User.hasMany(models.Address);
    User.hasMany(models.Order);
  };
  return User;
};