'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    message: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    createAt: DataTypes.DATE
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User,{foreignKey:'userId'});
    Review.belongsTo(models.Product,{foreignKey:'productId'});
  };
  return Review;
};