'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    fullname: DataTypes.STRING,
    avatarpath: DataTypes.STRING,
    isAdmin: 1
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comment,{foreignKey:'userId'});
    User.hasMany(models.Review,{foreignKey:'userId'});
  };
  return User;
};