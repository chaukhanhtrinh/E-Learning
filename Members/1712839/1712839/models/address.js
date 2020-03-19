'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {});
  Address.associate = function(models) {
    // associations can be defined here
    Address.belongsTo(models.User);
    Address.hasMany(models.Order);
  };
  return Address;
};