'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    immagepath: DataTypes.STRING,
    availability: DataTypes.DECIMAL,
    summary: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category,{foreignKey:'categoryId'});
    Product.belongsTo(models.Brand,{foreignKey:'brandId'});
    Product.hasMany(models.ProductColor,{foreignKey:'productId'});
    Product.hasMany(models.Comment,{foreignKey:'productId'});
    Product.hasMany(models.Review,{foreignKey:'productId'});
  };
  return Product;
};