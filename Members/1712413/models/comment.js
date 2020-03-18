'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    message: DataTypes.STRING,
    createAt: DataTypes.DATE
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Product,{foreignKey:'productId'});
    Comment.belongsTo(models.User,{foreignKey:'userId'});

  };
  return Comment;
};





