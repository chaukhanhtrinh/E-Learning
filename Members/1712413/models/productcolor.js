'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define('ProductColor', {
    immagepath: DataTypes.STRING
  }, {});
  ProductColor.associate = function(models) {
    // associations can be defined here
    ProductColor.belongsTo(models.Product,{foreignKey:'productId'});
    ProductColor.belongsTo(models.Color,{foreignKey:'colorId'});

  };
  return ProductColor;
};