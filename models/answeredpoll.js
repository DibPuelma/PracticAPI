'use strict';
module.exports = function(sequelize, DataTypes) {
  var AnsweredPoll = sequelize.define('AnsweredPoll', {
  }, {
    underscored: true,
    paranoid: true,
    classMethods: {
      associate: function(models) {
        AnsweredPoll.belongsTo(models.User);
        AnsweredPoll.belongsTo(models.Employee);
        AnsweredPoll.belongsTo(models.SellPoint);
        AnsweredPoll.hasMany(models.Answer);
        AnsweredPoll.belongsTo(models.Poll);
      }
    }
  });
  return AnsweredPoll;
};
