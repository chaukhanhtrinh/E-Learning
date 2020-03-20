'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    imagepath: DataTypes.STRING,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Comment);
    Product.hasMany(models.OrderDetail);
  };
  return Product;
};