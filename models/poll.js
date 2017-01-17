'use strict';
module.exports = function(sequelize, DataTypes) {
  var Poll = sequelize.define('Poll', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Poll.hasMany(models.Question);
        Poll.belongsTo(models.Company);
        Poll.belongsTo(models.SellPoint);
      }
    }
  });
  return Poll;
};